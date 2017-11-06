import cgi
import cgitb
import string
import sys

cgitb.enable()
print "Content-type: text/html\n\n"
print

form_data = cgi.FieldStorage()
score_file = "/home/kkivis/prax3/results.txt"
template = "/home/kkivis/prax3/template.html"


def main():
    if form_data.has_key("op") and form_data["op"].value == "show":
        show()
    else:
        store()


def show():
    f = open(template, "r")
    html = f.read()
    f.close()

    f = open(score_file, "r")
    content = f.readlines()
    f.close()
    html_string = ""
    for row in content:
        html_string += "<div class='results'>"
        split_row = row.split(",")
        for column in split_row:
            html_string += column + " "
        html_string += "</div>"
    html_string = string.replace(html, "sisu", html_string)
    print html_string


def store():
    bombs = ""
    player = ""
    table = ""
    if form_data.has_key("bombs"):
        bombs = form_data['bombs'].value
    if form_data.has_key("player"):
        player = form_data['player'].value
    if form_data.has_key("table"):
        table = form_data['table'].value
    if not bombs or not player or not table:
        print "something wrong"
        sys.exit(0)

    score_string = table + ", " + player + ", " + bombs

    f = open(score_file, "a")
    f.write(score_string + "\n")
    f.close()

    f = open(score_file, "r")
    content = f.read()
    f.close()

    print content


main()
