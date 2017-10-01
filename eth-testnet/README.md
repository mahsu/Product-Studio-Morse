# BetterBlock Blockchain Bootstrapper

The makefile contained in this directory will help bootstrap a custom testnetwork by creating a genesis block, bootnode, nodes, and a miner. Each node is sandboxed to its own `--datadir` under the nodes folder, so you can run as many nodes as you want. However, ethereum only supports running a single miner on a machine without some extra configuration.

## Prerequisites
* macOS with Homebrew installed
* git

## Setup
To get started, run:

````
    make setup
````

This will install ethereum, build a copy from source, and setup the bootnode.

## Starting the Bootnode

In a separate terminal window, you can startup the bootnode. The bootnode makes it so that nodes can automatically discover each other without needing to manually each other. 

````
    make bootnode
````

The bootnode will now be running in the foreground, so switch over to another terminal window.

## Starting a Miner

In order to run a miner, we need to first initialize a node from a genesis block. Then, we need to create an account for the node before we can point the miner at the account's address. 

````
    make init-genesis
    make account-new
    make miner
````

The miner should now be running in the foreground. On a first run the miner will construct the DAG dataset required for the Ethhash PoW system. This will take a while. However, after this is complete, you should be mining blocks very quickly. The miner's datadir is the default setting for `make node`. That is, if you want to run the same node in interactive mode (to check balances, etc), run `make node`.

If you want to rerun the miner later, you only need to run

````
    make miner
````

## Starting More Nodes

To run a different node, you can just use `make node` with parameters. Specify a directory for datadir and a port number. If running on a single machine, the port numbers must be different:

````
    make node DATADIR=node2 PORT=30307
    make node DATADIR=node3 PORT=30308
````

Each node will run in the foreground in console mode, so you can interactively run commands. If you have a miner running, there should be blocks syncing between nodes! (TODO: check balances) 
