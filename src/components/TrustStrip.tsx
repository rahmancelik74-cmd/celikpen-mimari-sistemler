import React from 'react';
import { SITE_CONFIG } from '../config/site.config';

const CONTENT = {
  freeSurvey: 'Ücretsiz Lazer Keşif',
  warrantySuffix: 'Yıl Sistem Garantisi',
  projectSuffix: 'Proje',
};

export function TrustStrip() {
  const badges = [
    `✅ ${CONTENT.freeSurvey}`,
    `✅ ${SITE_CONFIG.warranties.glassCertification}`,
    `✅ ${SITE_CONFIG.warranties.mechanicalWarrantyYears} ${CONTENT.warrantySuffix}`,
    `✅ ${SITE_CONFIG.completedProjects.toLocaleString('tr-TR')}+ ${CONTENT.projectSuffix}`,
  ];

  return (
    <section
      aria-label="Çelikpen Kurumsal Güvence Rozetleri"
      className="border-y border-celikpen-border bg-celikpen-subtle py-3.5"
    >
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 text-xs font-semibold text-slate-700">
        {badges.map((badge) => (
          <span key={badge} className="inline-flex items-center gap-1.5">
            {badge}
          </span>
        ))}
      </div>
    </section>
  );
}
