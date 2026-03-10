require("dotenv").config();
const { ethers } = require("ethers");

// Configuration
const RPC_URL = "https://ethereum-sepolia.publicnode.com";
const CONTRACT_ADDRESS = "0x4B83D03290527a291a99Ea85b4d772C1F91d3354";

const ABI = [
    "function createCampaign(string _title, string _description, uint256 _goalAmount, uint256 _durationDays) public",
    "function contribute(uint256 _campaignId) public payable",
    "function claimFunds(uint256 _campaignId) public",
    "function refund(uint256 _campaignId) public",
    "function checkCampaign(uint256 _campaignId) public",
    "function cancelCampaign(uint256 _campaignId) public",
    "function extendDeadline(uint256 _campaignId, uint256 _additionalDays) public",
    "function getCampaignDetails(uint256 _campaignId) public view returns (tuple(uint256 campaignId, address creator, string title, string description, uint256 goalAmount, uint256 currentAmount, uint256 deadline, uint256 createdAt, uint8 status, uint256 contributorCount, bool isExtended))",
    "function campaignCounter() public view returns (uint256)",
    "event CampaignCreated(uint256 indexed campaignId, address indexed creator, string title, uint256 goalAmount, uint256 deadline)",
    "event ContributionMade(uint256 indexed campaignId, address indexed contributor, uint256 amount, uint256 totalRaised)"
];

async function main() {
    const provider = new ethers.JsonRpcProvider(RPC_URL);
    
    if (!process.env.PRIVATE_KEY_CREATOR || !process.env.PRIVATE_KEY_USER) {
        console.error("Missing private keys in .env");
        return;
    }

    const creator = new ethers.Wallet(process.env.PRIVATE_KEY_CREATOR, provider);
    const user = new ethers.Wallet(process.env.PRIVATE_KEY_USER, provider);

    console.log("Using Creator:", creator.address);
    console.log("Using User:", user.address);

    const contractCreator = new ethers.Contract(CONTRACT_ADDRESS, ABI, creator);
    const contractUser = new ethers.Contract(CONTRACT_ADDRESS, ABI, user);

    try {
        // 1. Create a Campaign (Tiny goal: 0.011 ETH)
        console.log("\n1. Creating Campaign...");
        const goal = ethers.parseEther("0.011");
        const tx1 = await contractCreator.createCampaign(
            "Test Automatis",
            "Testing all features with minimal library",
            goal,
            1 // 1 day
        );
        await tx1.wait();
        const campaignId = await contractCreator.campaignCounter();
        console.log("Campaign Created! ID:", campaignId.toString());

        // 2. Contribute (Tiny contribution: 0.001 ETH)
        console.log("\n2. Contributing...");
        const amount = ethers.parseEther("0.001");
        const tx2 = await contractUser.contribute(campaignId, { value: amount });
        await tx2.wait();
        console.log("Contributed 0.001 ETH!");

        // 3. Extend Deadline (Feature check)
        console.log("\n3. Extending Deadline...");
        const tx3 = await contractCreator.extendDeadline(campaignId, 1);
        await tx3.wait();
        console.log("Deadline Extended!");

        // 4. Cancel Campaign (Feature check)
        console.log("\n4. Cancelling Campaign...");
        const tx4 = await contractCreator.cancelCampaign(campaignId);
        await tx4.wait();
        console.log("Campaign Cancelled!");

        // 5. Refund (Feature check)
        console.log("\n5. Claiming Refund...");
        const tx5 = await contractUser.refund(campaignId);
        await tx5.wait();
        console.log("Refund Claimed!");

        console.log("\n✅ All features tested successfully (Minimal gas used)!");
        
    } catch (error) {
        console.error("\n❌ Test Failed:", error.reason || error.message);
    }
}

main();
