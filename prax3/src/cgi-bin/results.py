import cgi
import cgitb

print "Content-type: text/html\n\n"
print

cgitb.enable()
form_data = cgi.FieldStorage()
score_file = "home/kkivis/public_html/prax3/results.txt"
template = "home/kkivis/public_html/prax3/template.html"


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
