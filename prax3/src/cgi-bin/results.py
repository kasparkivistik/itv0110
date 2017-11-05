import cgi
import cgitb

print "Content-type: text/html\n\n"
print

cgitb.enable()
form_data = cgi.FieldStorage()
score_file = "./prax3/results.txt"
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


def store():
    winner = ""
    player = ""
    table = ""
    if form_data.has_key("winner"):
        winner = form_data['winner'].value
    if form_data.has_key("player"):
        player = form_data['player'].value
    if form_data.has_key("table"):
        table = form_data['table'].value
    if not winner or not player or not table:
        print "something wrong"

    score_string = player + ", " + table + ", " + winner

    f = open(score_file, "a")
    f.write(score_string + "\n")
    f.close()

    f = open(score_file, "r")
    content = f.read()
    f.close()

    print content
