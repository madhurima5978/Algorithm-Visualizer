import turtle

wn = turtle.Screen()
wn.bgcolor("black")
wn.title("My Gamie")
wn.setup(700,700)

#create pen
class Pen(turtle.Turtle):
    def __init__(self):
        turtle.Turtle.__init__(self)
        self.shape("square")
        self.color("white")
        self.penup()
        self.speed(0)
 

class Player(turtle.Turtle):
    def __init__(self):
        turtle.Turtle.__init__(self)
        self.shape("square")
        self.color("blue")
        self.penup()
        self.speed(0)

levels = [""]

level_1 = [
"XXXXXXXXXXXXXXXXXXXXXXXXX",
"XP XXXXXXX          XXXXX",
"X  XXXXXXX  XXXXXX  XXXXX",
"X       XX  XXXXXX  XXXXX",
"X       XX  XXX        XX",
"XXXXXX  XX  XXX        XX",
"XXXXXX  XX  XXXXXX  XXXXX",
"XXXXXX  XX    XXXX  XXXXX",
"X  XXX        XXXX  XXXXX",
"X  XXX  XXXXXXXXXXXXXXXXX",
"X         XXXXXXXXXXXXXXX",
"X                XXXXXXXX",
"XXXXXXXXXXXX     XXXXX  X",
"XXXXXXXXXXXXXXX  XXXXX  X",
"XXX  XXXXXXXXXX         X",
"XXX                     X",
"XXX         XXXXXXXXXXXXX",
"XXXXXXXXXX  XXXXXXXXXXXXX",
"XXXXXXXXXX              X",
"XX   XXXXX              X",
"XX   XXXXXXXXXXXXX  XXXXX",
"XX           XXXX       X",
"XXXX                    X",
"XXXXXXXXXXXXXXXXXXXXXXXXX"
]

levels.append(level_1)

def setup_maze(level): 
    for y in range(len(level)):
        for x in range(len(level[y])):
            character = level[y][x]

            screen_x = -288 + (x * 24)
            screen_y = 288 - (y * 24)

            if character == "X":
                pen.goto(screen_x, screen_y)
                pen.stamp()
            if character == "P":
                player.goto(screen_x,screen_y)

pen = Pen()
player = Player()
setup_maze(levels[1])

# Add player movement controls
def go_up():
    x = player.xcor()
    y = player.ycor() + 24
    if (x, y) not in walls:
        player.sety(y)

def go_down():
    x = player.xcor()
    y = player.ycor() - 24
    if (x, y) not in walls:
        player.sety(y)

def go_left():
    x = player.xcor() - 24
    y = player.ycor()
    if (x, y) not in walls:
        player.setx(x)

def go_right():
    x = player.xcor() + 24
    y = player.ycor()
    if (x, y) not in walls:
        player.setx(x)

# Define wall coordinates
walls = []
for y in range(len(level_1)):
    for x in range(len(level_1[y])):
        if level_1[y][x] == "X":
            walls.append((-288 + (x * 24), 288 - (y * 24)))

# Bind movement functions to keyboard keys
wn.listen()
wn.onkeypress(go_up, "w")
wn.onkeypress(go_down, "s")
wn.onkeypress(go_left, "a")
wn.onkeypress(go_right, "d")


def close_window():
    wn.bye()
    sys.exit()  # Exit the program gracefully

wn.listen()
wn.onkeypress(close_window, "Escape")  # Bind the close_window function to the Escape key

wn.mainloop()  # Start the main event loop