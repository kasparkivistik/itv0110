#!usr/bin/python
# -*- coding: utf-8 -*-
import cgi
import cgitb
import string

cgitb.enable()

print "Content-type: text/html\n\n"

formdata = cgi.FieldStorage()

scorefile = "./prax3/results.txt"
template = "./prax3/template.html"


#def show():
#    f = open(template, "r")
#    html = f.read()
#    f.close()
#
#    f = open(scorefile, "r")
#    content = f.readlines()
#    f.close()
#    htmlstring = ""
#    for row in content:
#        htmlstring += "<div>"
#        splitrow = row.split(",")
#        for column in splitrow:
#            htmlstring += column + " "
#        htmlstring += "</div>"
#    htmlstring = string.replace(html, "sisu", htmlstring)
#    print htmlstring
#
#
def store():
    winner = ""
    player = ""
    table = ""
    if formdata.has_key("winner"):
        winner = formdata['winner'].value
    if formdata.has_key("player"):
        player = formdata['player'].value
    if formdata.has_key("table"):
        table = formdata['table'].value
    if not winner or not player or not table:
        print "something wrong"

    scorestring = player + ", " + table + ", " + winner

    f = open(scorefile, "a")
    f.write(scorestring + "\n")
    f.close()

    f = open(scorefile, "r")
    content = f.read()
    f.close()

    print content

store()