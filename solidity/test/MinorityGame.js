const {expect} = require("chai");
const {loadFixture} = require("@nomicfoundation/hardhat-network-helpers");

const ticketPrice = 100000000

describe("Token contract", function () {
    async function deployContractFixture() {
        // Get the ContractFactory and Signers here.
        const Contract = await ethers.getContractFactory("MinorityGame");
        const [owner, addr1, addr2] = await ethers.getSigners();

        const contractInstance = await Contract.deploy(ticketPrice);

        await contractInstance.deployed();

        // Fixtures can return anything you consider useful for your tests
        return {Contract, contractInstance, owner, addr1, addr2};
    }

    describe("Deployment", function () {
        it("Should set the right gameMaster", async function () {
            const {contractInstance, owner} = await loadFixture(deployContractFixture);
            expect(await contractInstance.gameMaster()).to.equal(owner.address);
        });

        it("Should set the right ticketPrice", async function () {
            const {contractInstance} = await loadFixture(deployContractFixture);
            expect(await contractInstance.ticketPrice()).to.equal(ticketPrice);
        });

        it("Should set Qid = 1", async function () {
            const {contractInstance} = await loadFixture(deployContractFixture);
            expect(await contractInstance.qid()).to.equal(1);
        });

        it("Should not have any initial players", async function () {
            const {contractInstance} = await loadFixture(deployContractFixture);
            expect(await contractInstance.getPlayersNumber()).to.equal(0);
        });

        it("Should not have any initial balance", async function () {
            const {contractInstance} = await loadFixture(deployContractFixture);
            expect(await contractInstance.getBalance()).to.equal(0);
        });
    });

    describe("Modifiers", function () {
        it("onlyGameMaster should work", async function () {
            const {contractInstance, addr1} = await loadFixture(deployContractFixture);
            await expect(contractInstance.connect(addr1).emergencyRepay()).to.be.revertedWith('Only GameMaster can call this function');
        });

        it("onlyGameMaster should work", async function () {
            const {contractInstance, addr1} = await loadFixture(deployContractFixture);
            await expect(contractInstance.connect(addr1).emergencyRepay()).to.be.revertedWith('Only GameMaster can call this function');
        });
    });

});

