TS_FILE=Graph.ts
LIB=lib/collections.ts lib/node.d.ts
OUT=Output.js

all: $(LIB) $(TS_FILE)
	tsc $(TS_FILE) $(LIB) -out $(OUT)

$(OUT):
	tsc $(TS_FILE) $(LIB) -out $(OUT)

test_node:
	tsc $(TS_FILE) $(LIB) -out $(OUT)
	node $(OUT)

.PHONY: clean
clean:
	-rm $(OUT)
