#!/usr/bin/python

import cgi
import cgitb
import string

cgitb.enable()

print "Content-type: text/html"
print

form_data = cgi.FieldStorage()
score_file = "/home/kkivis/public_html/prax3/results.txt"
template = "/home/kkivis/public_html/prax3/template.html"


def main():
    if form_data.has_key("op") and form_data["op"].value == "show":
        show()
    elif form_data.has_key("op") and form_data["op"].value == "sort":
        sort(form_data["playerName"].value)
    else:
        store()


def sort(name):
    f = open(template, "r")
    html = f.read()
    f.close()

    f = open(score_file, "r")
    content = f.readlines()
    f.close()

    html_string = ""
    count = 0
    for row in content:
        count += 1
        if count == 100:
            break
        elif name in row:
            html_string += "<tr>"
            split_row = row.split(",")
            for column in split_row:
                html_string += "<td>" + column + "</td>"
        html_string += "</tr>"
    html_string = string.replace(html, "sisu", html_string)
    print html_string


def show():
    f = open(template, "r")
    html = f.read()
    f.close()

    f = open(score_file, "r")
    content = f.readlines()
    f.close()

    html_string = ""
    for row in content:
        html_string += "<tr>"
        split_row = row.split(",")
        for column in split_row:
            html_string += "<td>" + column + "</td>"
        html_string += "</tr>"
    html_string = string.replace(html, "sisu", html_string)
    print html_string


def store():
    bombs = ""
    player = ""
    table = ""
    moves = ""
    if form_data.has_key("bombs"):
        bombs = form_data['bombs'].value
    if form_data.has_key("player"):
        player = form_data['player'].value
    if form_data.has_key("table"):
        table = form_data['table'].value
    if form_data.has_key("moves"):
        moves = form_data['moves'].value
    if not bombs or not player or not table or not moves:
        print "please enter keys and their cooperative values in the url up in the address bar"
        print "thanks"

    score_string = player + ", " + table + ", " + bombs + ", " + moves

    f = open(score_file, "a")
    f.write(score_string + "\n")
    f.close()

    f = open(score_file, "r")
    score_data = f.read()
    f.close()
    return score_data


main()
