import styles from "./LoadingSkeleton.module.css";

type SkeletonType = "card" | "list" | "detail";

interface LoadingSkeletonProps {
  type?: SkeletonType;
  count?: number;
}

function Shimmer() {
  return <div className={styles.shimmer} />;
}

function CardSkeleton() {
  return (
    <div className={`${styles.card} ${styles.pulse}`}>
      <div className={styles.cardImage}>
        <Shimmer />
      </div>
      <div className={styles.cardBody}>
        <div className={styles.cardTitle}>
          <Shimmer />
        </div>
        <div className={styles.cardMeta}>
          <div className={styles.cardMetaItem}>
            <Shimmer />
          </div>
          <div className={styles.cardMetaItem}>
            <Shimmer />
          </div>
          <div className={styles.cardMetaItem}>
            <Shimmer />
          </div>
        </div>
        <div className={styles.cardPrice}>
          <Shimmer />
        </div>
        <div className={styles.cardButton}>
          <Shimmer />
        </div>
      </div>
    </div>
  );
}

function ListSkeleton() {
  return (
    <div className={styles.list}>
      {[0, 1, 2].map((i) => (
        <div key={i} className={`${styles.listItem} ${styles.pulse}`}>
          <div className={styles.listItemImage}>
            <Shimmer />
          </div>
          <div className={styles.listItemBody}>
            <div className={styles.listItemTitle}>
              <Shimmer />
            </div>
            <div className={styles.listItemMeta}>
              <Shimmer />
            </div>
            <div className={styles.listItemMeta} style={{ width: "40%" }}>
              <Shimmer />
            </div>
            <div className={styles.listItemPrice}>
              <Shimmer />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function DetailSkeleton() {
  return (
    <div className={`${styles.detail} ${styles.pulse}`}>
      <div className={styles.detailHero}>
        <Shimmer />
      </div>
      <div className={styles.detailContent}>
        <div className={styles.detailMain}>
          <div className={styles.detailTitle}>
            <Shimmer />
          </div>
          <div className={styles.detailText}>
            <Shimmer />
          </div>
          <div className={styles.detailTextShort}>
            <Shimmer />
          </div>
          <div className={styles.detailText}>
            <Shimmer />
          </div>
          <div className={styles.detailText} style={{ width: "60%" }}>
            <Shimmer />
          </div>
        </div>
        <div className={styles.detailSidebar}>
          <div className={styles.sidebarPrice}>
            <Shimmer />
          </div>
          <div className={styles.sidebarRow}>
            <Shimmer />
          </div>
          <div className={styles.sidebarRow} style={{ width: "65%" }}>
            <Shimmer />
          </div>
          <div className={styles.sidebarRow} style={{ width: "75%" }}>
            <Shimmer />
          </div>
          <div className={styles.sidebarButton}>
            <Shimmer />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoadingSkeleton({
  type = "card",
  count = 1,
}: LoadingSkeletonProps) {
  const renderSkeleton = () => {
    switch (type) {
      case "list":
        return <ListSkeleton />;
      case "detail":
        return <DetailSkeleton />;
      case "card":
      default:
        return <CardSkeleton />;
    }
  };

  if (type !== "card" || count === 1) {
    return <div className={styles.skeleton}>{renderSkeleton()}</div>;
  }

  return (
    <div className={styles.skeleton}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "1.5rem",
          maxWidth: "1000px",
          margin: "0 auto",
          padding: "1rem",
        }}
      >
        {Array.from({ length: count }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
