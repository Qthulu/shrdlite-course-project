
TARGETS = html ajax ansi offline

.DELETE_ON_ERROR:

.PHONY: help clean all $(TARGETS) run


TSFILES = $(wildcard *.ts)

help:
	@echo "make help | clean | all | $(TARGETS:%=% |) ..."

clean:
	rm -f $(TSFILES:%.ts=%.js) *.map

all: $(TARGETS)

$(TARGETS): %: shrdlite-%.js

%.js: %.ts $(TSFILES)
	tsc --out $@ $<

grammar.js: grammar.ne
	nearleyc $< > $@

io: clean html
	cp -f *.html ../Qthulu.github.io/
	cp -f *.css ../Qthulu.github.io/
	cp -f *.js ../Qthulu.github.io/
	cp -f shrdlite.html ../Qthulu.github.io/index.html
	cp -fa lib ../Qthulu.github.io/

run: shrdlite-offline.js
	# node shrdlite-offline.js small "grasp the yellow box"
	# node shrdlite-offline.js small "put the blue table on a box"
	# node shrdlite-offline.js small "move the blue table beside the yellow box" # tests 'beside'
	# node shrdlite-offline.js small "put the blue table right of the blue box" # tests 'right of'
	# node shrdlite-offline.js small "put the yellow box left of the blue box" # tests 'left of'
	# node shrdlite-offline.js small "put the blue table below the blue box"
	# node shrdlite-offline.js small "put a table below the blue box"
	node shrdlite-offline.js small "take a blue object"
	# node shrdlite-offline.js small "put the big ball in the box"

medium: shrdlite-offline.js
	# node shrdlite-offline.js medium "put the blue box above the red box"
	# node shrdlite-offline.js medium "put the red box below the blue box"
	node shrdlite-offline.js medium "put the green brick below the yellow pyramid"

complex: shrdlite-offline.js
	node shrdlite-offline.js complex "put the green plank on the red plank"
	# node shrdlite-offline.js complex "put the green plank above the yellow pyramid"
	# node shrdlite-offline.js complex "put the green plank left of the yellow pyramid"
	# node shrdlite-offline.js complex "grasp the red plank"

ambiguity: shrdlite-offline.js
	node shrdlite-offline.js medium "put a ball that is on the floor beside the green plank"

bug: shrdlite-offline.js
	# node shrdlite-offline.js small "grasp an object under a box"
	node shrdlite-offline.js complex "put the ball that is on a box on a brick"
	# node shrdlite-offline.js complex "put the white ball on a box on a brick"
