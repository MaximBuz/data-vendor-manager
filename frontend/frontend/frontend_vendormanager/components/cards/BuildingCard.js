// Styling
import { UilBuilding } from "@iconscout/react-unicons";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

export default function BuildingCard({ building }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: "20px",
        padding: "20px",
        borderRadius: "2px",
        borderStyle: "solid",
        borderWidth: "1px",
        borderColor: "#d9d9d9",
        margin: "20px",
        backgroundColor: "white",
      }}
    >
      <UilBuilding />
      <h1
        style={{
          lineHeight: "1em",
          position: "relative",
          top: "4px",
        }}
      >
        {building.building_name}
      </h1>
      <div
        style={{
          marginLeft: "auto",
          display: "flex",
          gap: "10px",
        }}
      >
        <EditOutlined
          style={{
            color: "grey",
            fontSize: "17px",
          }}
        />
        <DeleteOutlined
          style={{
            color: "grey",
            fontSize: "17px",
          }}
        />
      </div>
    </div>
  );
}
