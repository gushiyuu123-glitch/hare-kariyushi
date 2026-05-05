import { useActiveSection } from "../hooks/useActiveSection";
import styles from "./SectionRail.module.css";

const SECTION_LIST = [
  { id: "hero", label: "HARE", no: "00", hidden: true },
  { id: "collection", label: "COLLECTION", no: "01" },
  { id: "concept", label: "CONCEPT", no: "02" },
  { id: "catalog", label: "CATALOG", no: "03" },
  { id: "voices", label: "VOICES", no: "04" },
  { id: "guide", label: "GUIDE", no: "05" },
  { id: "faq", label: "FAQ", no: "06" },
  { id: "stockists", label: "STOCKISTS", no: "07" },
  { id: "inquiry", label: "INQUIRY", no: "08" },

  // footerは監視対象に入れる。でも表示はしない。
  { id: "footer", label: "FOOTER", no: "09", hidden: true },
];

const SECTION_IDS = SECTION_LIST.map((section) => section.id);

const SECTION_MAP = new Map(
  SECTION_LIST.map((section) => [section.id, section])
);

export default function SectionRail() {
  const activeId = useActiveSection(SECTION_IDS, {
    rootMargin: "-42% 0px -54% 0px",
    threshold: [0, 0.01, 0.08, 0.12, 0.2, 0.35, 0.5, 0.75],
  });

  const active = SECTION_MAP.get(activeId) ?? SECTION_LIST[0];

  const hidden = !activeId || active.hidden === true;

  return (
    <aside
      className={styles.rail}
      data-hidden={hidden ? "true" : "false"}
      aria-hidden="true"
    >
      <span className={styles.no}>{active.no}</span>
      <span className={styles.rule} aria-hidden="true" />
      <span className={styles.label}>{active.label}</span>
    </aside>
  );
}