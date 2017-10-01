# https://medium.com/@WWWillems/how-to-set-up-a-private-ethereum-testnet-blockchain-using-geth-and-homebrew-1106a27e8e1e
# https://souptacular.gitbooks.io/ethereum-tutorials-and-tips-by-hudson/content/private-chain.html
SHELL := /bin/bash
MKFILE_PATH := $(abspath $(lastword $(MAKEFILE_LIST)))
# all node data
NODES := nodes
# dir of master testnet node (for mining)
TESTNET_DIR := private-testnet
LIB_SCRIPTS := lib-scripts
GENESIS := CustomGenesis.json
GETH_BIN := go-ethereum/build/bin
BOOT_KEY := $(NODES)/bootnode.key
BOOT_ADDR := $(NODES)/bootnode.addr
GETH_FLAGS := --identity "BetterBlock" --networkid 189373464
GETH_FLAGS_MASTER := $(GETH_FLAGS) --datadir $(TESTNET_DIR)
FIRST_ACCOUNT = $(shell cat $(NODES)/account_list.txt | perl -ne '/{(.*)}/ && print $$1')

# node specific parameters
DATADIR ?= $(TESTNET_DIR)
PORT ?= 30303
BOOTNODE_ADDR = $(shell cat $(BOOT_ADDR))
.PHONY: setup, init-bootnode, init-genesis, bootnode, mine, remove, node, clean

setup:
	brew update
	brew tap ethereum/ethereum
	brew install ethereum
	mkdir -p $(NODES)
	-git clone https://github.com/ethereum/go-ethereum
	cd go-ethereum && make all
	echo 'password' > $(NODES)/password
	make init-bootnode

init-bootnode:
	$(GETH_BIN)/bootnode -genkey $(BOOT_KEY)
	echo -n "enode://" > $(BOOT_ADDR)
	$(GETH_BIN)/bootnode --nodekey $(BOOT_KEY) --writeaddress | tr -d '\n' >> $(BOOT_ADDR)
	echo -n "@127.0.0.1:30301" >> $(BOOT_ADDR)

init-genesis:
	# initialize a private testnet genesis
	mkdir -p $(NODES)/$(DATADIR)
	geth $(GETH_FLAGS) --datadir $(NODES)/$(DATADIR) init $(GENESIS) 

bootnode:
	# runs a bootnode for node discovery
	$(GETH_BIN)/bootnode --nodekey $(BOOT_KEY) --verbosity 6

miner: account-list
	@echo $(FIRST_ACCOUNT)
	geth  $(GETH_FLAGS) --bootnodes $(BOOTNODE_ADDR) --datadir $(NODES)/$(TESTNET_DIR) --port 60609 --mine --unlock 0 --password $(NODES)/password --minerthreads=2 --etherbase=0x$(FIRST_ACCOUNT)

remove:
	geth removedb --datadir $(DATADIR)

account-list:
	geth --datadir $(NODES)/$(TESTNET_DIR) account list | tee $(NODES)/account_list.txt

account-new:
	geth -password $(NODES)/password account new --datadir $(NODES)/$(TESTNET_DIR)

node:
	$(LIB_SCRIPTS)/bootstrap-node.sh $(DATADIR)
	geth $(GETH_FLAGS) --datadir $(NODES)/$(DATADIR) --port $(PORT) --bootnodes $(BOOTNODE_ADDR) console

attach:
	geth $(GETH_FLAGS_MASTER) attach "$(TESTNET_DIR)/geth.ipc"

clean:
	rm -rf go-ethereum
	rm -rf $(NODES)
