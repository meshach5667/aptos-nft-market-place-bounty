# Aptos NFT Marketplace

This is an Aptos-related project that showcases the development of an NFT marketplace on the Aptos blockchain. The platform allows users to view their NFTs, list them for sale, and interact with NFTs on the marketplace. The repository includes various features such as an Analytics Dashboard designed to enhance the user experience.


## Features Overview

- **My NFTs**: Users can view their NFTs, list them for sale, and interact with them.
- **Marketplace**: Users can browse NFTs available for sale, filter by rarity, and add NFTs to their wishlist.
- **Analytics Dashboard**: View detailed statistics on marketplace activity.

## Additional feature
### Dashboard
The core additional feature of this project is the **NFT Marketplace Analytics Dashboard**, which offers:
- **Total Sales Overview**: Displays the total number of sales in the marketplace.
- **Popular NFTs by Sales**: A bar chart highlighting the NFTs with the highest sales.
- **Popular NFTs by Revenue**: A pie chart illustrating the revenue distribution among popular NFTs.
- **NFT Sales Data Table**: A tabular representation of NFT sales data for detailed analysis.
- **Interactive Charts**: Clickable charts to display detailed information about specific NFTs.


### Technical Highlights
- **React**: For building the interactive UI.
- **Ant Design**: For modern and visually appealing UI components.
- **@ant-design/plots**: For creating bar and pie charts.
- **AptosClient**: For fetching analytics data directly from the Aptos blockchain.
- **TypeScript**: For type safety and better code maintainability.

## How It Works

1. The dashboard fetches analytics data from the Aptos blockchain using the `AptosClient`.
2. The fetched data includes:
   - Total sales in the marketplace.
   - A list of popular NFTs with their sales details.
3. The data is visualized using bar and pie charts, providing users with actionable insights.


## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/meshach5667/aptos-nft-market-place-bounty
   cd aptos-nft-market-place-bounty
npm install```


### Start the development server

```bash
npm start

```



