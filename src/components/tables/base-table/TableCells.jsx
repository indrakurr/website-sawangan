import { Table, Badge, Text } from "@chakra-ui/react";

/**
 * Cell for showing text content
 * @param {{ content: string, maxWidth: string, props: any }} props
 */
export function TextCell({ content, maxWidth = "8rem", ...props }) {
  return (
    <Table.Cell maxW={maxWidth} isTruncated>
      <Text {...props} color="#383838">
        {content}
      </Text>
    </Table.Cell>
  );
}

/**
 * Cell for showing badge content
 * @param {{ colorScheme: string, content: string }} props
 */
export function BadgeCell({ colorScheme, content }) {
  const badge = (color, bgColor, px = "8px", py = "6px", rounded = null) => (
    <Table.Cell>
      <Badge
        px={px}
        py={py}
        rounded={rounded}
        fontSize="xs"
        fontWeight="medium"
        color={color}
        bg={bgColor}
      >
        {content}
      </Badge>
    </Table.Cell>
  );

  const schemes = {
    green: ["#154C3C", "#C7EBD1", "9px", "5px", "2xl"],
    green2: ["#fff", "#28A745", "9px", "5px", "2xl"],
    yellow: ["#5F5207", "#FBF5D0", "9px", "5px", "2xl"],
    yellow2: ["#fff", "#FFC107", "9px", "5px", "2xl"],
    red: ["#76170F", "#FADCD9", "9px", "5px", "2xl"],
    blue: ["#0A3A6D", "#D6EAFB", "9px", "5px", "2xl"],
    blue2: ["#fff", "#007BFF", "9px", "5px", "2xl"],
    azure: ["#6C3483", "#E8DAEF", "9px", "5px", "2xl"],
    gold: ["#fff", "#D4AF35", "9px", "5px", "2xl"],
    silver: ["#fff", "#BBBBBB", "9px", "5px", "2xl"],
    bronze: ["#fff", "#C97513", "9px", "5px", "2xl"],
    default: ["#828282", "#E0E0E0"],
  };

  const [color, bg, px, py, rounded] =
    schemes[colorScheme] || schemes["default"];
  return badge(color, bg, px, py, rounded);
}

/**
 * Cell for showing centered content
 * @param {{ children: React.ReactNode }} props
 */
export function CenteredCell({ children }) {
  return (
    <Table.Cell textAlign="center" color="#383838">
      {children}
    </Table.Cell>
  );
}

/**
 * Cell for showing left-aligned content
 * @param {{ children: React.ReactNode, maxWidth: string }} props
 */
export function LeftAlignCell({ children, maxWidth }) {
  return (
    <Table.Cell
      maxW={maxWidth || "max-content"}
      textAlign="left"
      color="#383838"
    >
      {children}
    </Table.Cell>
  );
}

/**
 * Cell for showing link content
 * @param {{ content: string, textAlign: string, onClick: function }} props
 */
export function LinkCell({ content, textAlign, onClick }) {
  return (
    <Table.Cell
      color="#5B79EF"
      maxW="12.5rem"
      overflowWrap="break-word"
      whiteSpace="normal"
      textAlign={textAlign || "center"}
    >
      <Text
        as="button"
        cursor="pointer"
        _hover={{ color: "#2C5282", textDecoration: "underline" }}
        onClick={onClick}
      >
        {content}
      </Text>
    </Table.Cell>
  );
}

/**
 * Cell for showing not found content
 * @param {{ count: number }} props
 */
export function NotFoundCell({ count }) {
  return (
    <Table.Cell colSpan={count} textAlign="center" color={"black"}>
      Data tidak ditemukan
    </Table.Cell>
  );
}

/**
 * Cell for showing truncated content
 * @param {{ content: string, maxCharLength: number, maxWidth: string }} props
 */
export function TruncatedCell({ content, maxCharLength, maxWidth }) {
  const truncatedContent =
    content.length > maxCharLength
      ? `${content.substring(0, maxCharLength)}...`
      : content;

  return (
    <Table.Cell
      style={{
        maxWidth: `${maxWidth}rem`,
        paddingLeft: "23px",
        paddingRight: "15px",
      }}
    >
      <div
        style={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {truncatedContent}
      </div>
    </Table.Cell>
  );
}
