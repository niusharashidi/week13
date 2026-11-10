import { useEffect, useRef, useState } from "react";

const STORAGE_KEY = "tabs-app:active-tab";

function getInitialTab(tabs) {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved !== null && tabs.some((t) => t.id === saved)) return saved;
  } catch {
    /* localStorage may be unavailable */
  }
  return tabs[0].id;
}

export default function Tabs({ tabs }) {
  const [activeId, setActiveId] = useState(() => getInitialTab(tabs));
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });
  const btnRefs = useRef({});

  // ذخیره‌ی آخرین تب
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, activeId);
    } catch {
      /* ignore */
    }
  }, [activeId]);

  // جابه‌جایی نرم خط زیر تب فعال
  useEffect(() => {
    const update = () => {
      const el = btnRefs.current[activeId];
      if (el) setIndicator({ left: el.offsetLeft, width: el.offsetWidth });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [activeId]);

  // ناوبری با کیبورد
  const onKeyDown = (e) => {
    const i = tabs.findIndex((t) => t.id === activeId);
    let next = null;
    if (e.key === "ArrowRight") next = (i + 1) % tabs.length;
    if (e.key === "ArrowLeft") next = (i - 1 + tabs.length) % tabs.length;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = tabs.length - 1;
    if (next === null) return;
    e.preventDefault();
    const id = tabs[next].id;
    setActiveId(id);
    btnRefs.current[id]?.focus();
  };

  const active = tabs.find((t) => t.id === activeId);

  return (
    <div className="tabs">
      <div className="tabs__list" role="tablist" onKeyDown={onKeyDown}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            ref={(el) => (btnRefs.current[tab.id] = el)}
            role="tab"
            id={`tab-${tab.id}`}
            aria-selected={tab.id === activeId}
            aria-controls={`panel-${tab.id}`}
            tabIndex={tab.id === activeId ? 0 : -1}
            className={`tabs__btn ${tab.id === activeId ? "is-active" : ""}`}
            onClick={() => setActiveId(tab.id)}
          >
            {tab.title}
          </button>
        ))}
        <span
          className="tabs__indicator"
          style={{
            transform: `translateX(${indicator.left}px)`,
            width: indicator.width,
          }}
        />
      </div>

      <section
        key={active.id}
        className="tabs__panel"
        role="tabpanel"
        id={`panel-${active.id}`}
        aria-labelledby={`tab-${active.id}`}
      >
        <h2>{active.heading}</h2>
        <p>{active.content}</p>
      </section>
    </div>
  );
}