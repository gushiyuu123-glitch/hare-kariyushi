import { useActiveSection } from "../hooks/useActiveSection";
import styles from "./SectionRailSp.module.css";

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
  { id: "footer", label: "FOOTER", no: "09", hidden: true },
];

const SECTION_IDS = SECTION_LIST.map((s) => s.id);
const SECTION_MAP = new Map(SECTION_LIST.map((s) => [s.id, s]));

export default function SectionRailSp({ forceHidden = false }) {
  const activeId = useActiveSection(SECTION_IDS, {
    // SPは“中央付近”で拾うと安定しやすい
    rootMargin: "-38% 0px -58% 0px",
    threshold: [0, 0.02, 0.08, 0.15, 0.25, 0.4, 0.6],
  });

  const active = SECTION_MAP.get(activeId) ?? SECTION_LIST[0];
  const hidden = forceHidden || !activeId || active.hidden === true;

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