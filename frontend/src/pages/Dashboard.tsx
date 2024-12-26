import React, { useEffect, useState } from "react";
import {
  Typography,
  Card,
  Row,
  Col,
  Statistic,
  Divider,
  Table,
  message,
  Spin,
  Modal,
  Tooltip,
} from "antd";
import { Bar, Pie } from "@ant-design/plots";
import { AptosClient } from "aptos";
import { TagsOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const client = new AptosClient("https://fullnode.testnet.aptoslabs.com/v1");

interface NFTSaleInfo {
  name: string;
  sales: number;
  revenue: number;
}

interface AnalyticsData {
  totalSales: number;
  popularNfts: NFTSaleInfo[];
}

interface DashboardProps {
  marketplaceAddr: string;
}

const Dashboard: React.FC<DashboardProps> = ({ marketplaceAddr }) => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedNFT, setSelectedNFT] = useState<null | NFTSaleInfo>(null);

  useEffect(() => {
    if (marketplaceAddr) {
      fetchAnalytics();
    }
  }, [marketplaceAddr]);

  const fetchAnalytics = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await client.view({
        function: `${marketplaceAddr}::NFTMarketplace::get_marketplace_analytics`,
        type_arguments: [],
        arguments: [marketplaceAddr],
      });

      if (response && Array.isArray(response)) {
        const [totalSales, popularNfts] = response as [
          number,
          { name: string; sales: number; revenue: number }[]
        ];

       
        setAnalyticsData({
          totalSales,
          popularNfts: popularNfts.map((nft) => ({
            ...nft,
            revenue: nft.revenue / 1e8, // Convert revenue
          })),
        });
      } else {
        throw new Error("Invalid response from the contract.");
      }
    } catch (error) {
      console.error("Error fetching analytics data:", error);
      setError("Failed to fetch analytics data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChartClick = (item: NFTSaleInfo) => {
    setSelectedNFT(item);
  };

  const barConfig = {
    data: analyticsData?.popularNfts || [],
    xField: "sales",
    yField: "name",
    seriesField: "name",
    label: {
      position: "top",
      style: { fill: "#000", fontSize: 14 },
    },
    tooltip: { showMarkers: false },
    colorField: "name",
    interactions: [{ type: "element-active" }],
    onClick: handleChartClick,
  };

  const pieConfig = {
    data: analyticsData?.popularNfts || [],
    angleField: "revenue",
    colorField: "name",
    radius: 0.8,
    label: {
      type: "spider",
      formatter: (data: NFTSaleInfo) => `${data.name}: ${data.revenue.toFixed(2)} APT`,

    },
    interactions: [{ type: "element-active" }],
    onClick: handleChartClick,
  };

  const columns = [
    { title: "NFT Name", dataIndex: "name", key: "name" },
    { title: "Sales", dataIndex: "sales", key: "sales" },
  ];

  return (
    <div
      style={{
        padding: "24px",
        backgroundColor: "#f4f4f4",
        minHeight: "100vh",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <div
        style={{
          padding: "16px",
          background: "linear-gradient(135deg, #0074D9, #2ECC40)",
          borderRadius: "8px",
          marginBottom: "24px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Title
          level={2}
          style={{
            textAlign: "center",
            color: "#ffffff",
            margin: 0,
            fontWeight: "bold",
          }}
        >
          NFT Marketplace Analytics Dashboard
        </Title>
      </div>

      {loading ? (
        <Spin size="large" style={{ display: "block", margin: "50px auto" }} />
      ) : error ? (
        <Text type="danger" style={{ display: "block", textAlign: "center" }}>
          {error}
        </Text>
      ) : (
        <>
          <Row gutter={[16, 16]} justify="center">
            <Col xs={24} sm={8} md={6}>
              <Card style={{ textAlign: "center" }} hoverable>
                <Statistic
                  title="Total Sales"
                  value={analyticsData?.totalSales || 0}
                  prefix={<TagsOutlined />}
                  valueStyle={{ color: "#1abc9c" }}
                />
              </Card>
            </Col>
          </Row>
          <Divider />
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <Card title="Popular NFTs by Sales" hoverable>
                <Bar {...barConfig} />
              </Card>
            </Col>
            <Col xs={24} md={12}>
              <Card title="Popular NFTs by Revenue" hoverable>
                <Pie {...pieConfig} />
              </Card>
            </Col>
          </Row>
          <Divider />
          <Card title="NFT Sales Data" hoverable>
            <Table
              dataSource={analyticsData?.popularNfts || []}
              columns={columns}
              rowKey="name"
              bordered
              pagination={{ pageSize: 5 }}
            />
          </Card>
        </>
      )}

      <Modal
        visible={!!selectedNFT}
        title="NFT Details"
        onCancel={() => setSelectedNFT(null)}
        footer={null}
        width={400}
      >
        {selectedNFT && (
          <>
            <p><strong>Name:</strong> {selectedNFT.name}</p>
            <p><strong>Sales:</strong> {selectedNFT.sales}</p>
            <p><strong>Revenue:</strong> {selectedNFT.revenue.toFixed(2)} APT</p>
          </>
        )}
      </Modal>
    </div>
  );
};

export default Dashboard;
