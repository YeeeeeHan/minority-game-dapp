const {expect} = require("chai");
const {loadFixture} = require("@nomicfoundation/hardhat-network-helpers");

const ticketPriceGwei = 100000000
const ticketPriceWei = ethers.utils.parseUnits(ticketPriceGwei.toString(), "gwei")

describe("Token contract", function () {
    async function deployContractFixture() {
        // Get the ContractFactory and Signers here.
        const Contract = await ethers.getContractFactory("MinorityGame");
        const [owner, addr1, addr2] = await ethers.getSigners();

        const contractInstance = await Contract.deploy(ticketPriceGwei);

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
            expect(await contractInstance.ticketPrice()).to.equal(ticketPriceGwei);
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
        it("onlyGameMaster should only allow game master to call", async function () {
            const {contractInstance, addr1} = await loadFixture(deployContractFixture);
            await expect(contractInstance.connect(addr1).emergencyRepay()).to.be.revertedWith('Only GameMaster can call this function');
        });

        it("resetContractState should increase qid", async function () {
            const {contractInstance, owner} = await loadFixture(deployContractFixture);
            expect(await contractInstance.qid()).to.equal(1);
            await contractInstance.connect(owner).emergencyRepay()
            let newQid = await contractInstance.qid()
            expect(await contractInstance.qid()).to.equal(2);
        });
    });

    describe("Casting votes", function () {
        it("Hasher should return consistent result", async function () {
            const {contractInstance, addr1} = await loadFixture(deployContractFixture);
            expect(await contractInstance.connect(addr1).hasher(addr1.address, 0, 10000, "salt")).to.equal("0x295e80e9dc5f553e811c0d96a1189ae9839125bac940c95f83af97b0ea6a40ae");
        });

        it("Vote should revert if message value != ticket price", async function () {
            const {contractInstance, addr1} = await loadFixture(deployContractFixture);
            const addr1_vote_hash = await contractInstance.connect(addr1).hasher(addr1.address, 0, 10000, "salt")
            // Call vote with insufficient message value
            const ticketPriceEth = ethers.utils.formatUnits(ticketPriceGwei - 1, "gwei")

            // Expect calling vote function to revert
            await expect(contractInstance.connect(addr1).vote(addr1_vote_hash, {
                from: addr1.address,
                value: ethers.utils.parseEther(ticketPriceEth)
            })).to.be.revertedWith('msg.value does not equal ticketPrice');
        });

        it("Vote should add voter to players array, and add hash to commitHash", async function () {
            const {contractInstance, addr1, addr2} = await loadFixture(deployContractFixture);

            // ---- Voting option 0 ----
            const addr1InitialBalanceWei = await addr1.getBalance()
            const addr1_vote_hash = await voteFunc(contractInstance, ticketPriceGwei, addr1, 0, 10000, "salt")

            // Expect addr1 balance to reduce
            const addr1FinalBalanceWei = await addr1.getBalance()
            expect(addr1InitialBalanceWei.sub(addr1FinalBalanceWei).sub(ticketPriceWei)).to.be.above(0)

            // Expect 1 player
            expect(await contractInstance.connect(addr1).getPlayersNumber()).to.be.equal(1);
            let contractBalanceInWei = await contractInstance.connect(addr1).getBalance()

            // Expect correct contract balance
            expect(contractBalanceInWei).to.be.equal(ticketPriceWei);

            // Expect hash added to commitHash
            expect(await contractInstance.connect(addr1).commitMap(addr1_vote_hash)).to.be.true;


            // ---- Voting option 1 ----
            const addr2InitialBalanceWei = await addr2.getBalance()
            const addr2_vote_hash = await voteFunc(contractInstance, ticketPriceGwei, addr2, 1, 10000, "salt")

            // Expect addr2 balance to reduce
            const addr2FinalBalanceWei = await addr2.getBalance()
            expect(addr2InitialBalanceWei.sub(addr2FinalBalanceWei).sub(ticketPriceWei)).to.be.above(0)

            // Expect 2 players
            expect(await contractInstance.connect(addr2).getPlayersNumber()).to.be.equal(2);
            contractBalanceInWei = await contractInstance.connect(addr2).getBalance()

            // Expect correct contract balance
            expect(contractBalanceInWei).to.be.equal((ticketPriceWei * 2).toString());

            // Expect hash added to commitHash
            expect(await contractInstance.connect(addr2).commitMap(addr2_vote_hash)).to.be.true;
        });
    });

    describe("Emergency repay", function () {
        it("Hasher should return consistent result ----", async function () {
            const {contractInstance, addr1} = await loadFixture(deployContractFixture);
            const addr1InitialBalanceWei = await addr1.getBalance()

            const addr1_vote_hash = await voteFunc(contractInstance, ticketPriceGwei, addr1, 0, 10000, "salt")

            // Expect addr1 balance to reduce
            const addr1FinalBalanceWei = await addr1.getBalance()
            expect(addr1InitialBalanceWei.sub(addr1FinalBalanceWei).sub(ticketPriceWei)).to.be.above(0)
        });
    });
});



async function voteFunc(contractInstance, msgValueGwei, addr, option, unix, salt) {
    const ticketPriceEth = ethers.utils.formatUnits(msgValueGwei, "gwei")
    const voteHash = await contractInstance.connect(addr).hasher(addr.address, option, unix, salt)
    await contractInstance.connect(addr).vote(voteHash, {
        from: addr.address,
        value: ethers.utils.parseEther(ticketPriceEth)
    })

    return voteHash
}

