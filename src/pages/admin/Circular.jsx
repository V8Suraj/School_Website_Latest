import { useState } from "react";
import { AdminPageShell } from "@/components/admin/AdminPageShell";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Printer, RefreshCw, FileText, ChevronDown, Globe, Languages, Loader2 } from "lucide-react";
import { translateFields } from "@/lib/translate";


const L = {
  en: {
    refNo: "Ref No.", date: "Date", to: "To", subject: "Subject",
    issuedBy: "Issued By", designation: "Designation",
    certifiedThat: "This is to certify that",
    schoolSeal: "School Seal", principal: "Principal", chairman: "Chairman",
    footer: "Pratap Saraswati Vidya Mandir · 108, Saraswati Marg, Bengaluru – 560001 · Affiliated to CBSE",
    tagline: "विद्या ददाति विनयं",
    blessing: "॥ सर्वे भवन्तु सुखिनः ॥",
    shloka: "॥ विद्यया अमृतमश्नुते ॥",
  },
  hi: {
    refNo: "संदर्भ संख्या", date: "दिनांक", to: "प्रति", subject: "विषय",
    issuedBy: "जारीकर्ता", designation: "पदनाम",
    certifiedThat: "यह प्रमाणित किया जाता है कि",
    schoolSeal: "विद्यालय मुद्रा", principal: "प्रधानाचार्य", chairman: "अध्यक्ष",
    footer: "विद्यालय स्कूल · १०८, सरस्वती मार्ग, बेंगलुरु – ५६०००१ · CBSE से संबद्ध",
    tagline: "विद्या ददाति विनयं",
    blessing: "॥ सर्वे भवन्तु सुखिनः ॥",
    shloka: "॥ विद्यया अमृतमश्नुते ॥",
  },
};

const defaultForm = {
  docType: "circular", lang: "en",
  refNo: "VID/2025-26/001",
  date: new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" }),
  to: "All Parents & Students",
  subject: "", body: "",
  issuedBy: "Dr. Arvind Krishnan", designation: "Principal",
  certType: "Certificate of Achievement",
  recipientName: "", certBody: "",
  certDate: new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" }),
  principalName: "Dr. Arvind Krishnan", chairmanName: "Shri Ramesh Gupta",
};

// ─── Inline-styled preview (renders identically in browser and print) ──────────

const s = {
  page: { fontFamily: "'Georgia', 'Times New Roman', serif", fontSize: "13px", color: "#1a1a1a", background: "#fff", padding: "40px", minHeight: "900px", position: "relative", boxSizing: "border-box" },
  certPage: { fontFamily: "'Georgia', 'Times New Roman', serif", fontSize: "13px", color: "#1a1a1a", background: "linear-gradient(135deg,#fffbf0 0%,#fff8e7 50%,#fffbf0 100%)", padding: "40px", minHeight: "900px", position: "relative", boxSizing: "border-box" },
  outerBorder: { position: "absolute", inset: "8px", border: "1px solid #fed7aa", borderRadius: "4px", pointerEvents: "none" },
  innerBorder: { position: "absolute", inset: "14px", border: "1px solid #ffedd5", borderRadius: "4px", pointerEvents: "none" },
  certBorder1: { position: "absolute", inset: "0", border: "12px solid #ffedd5", pointerEvents: "none" },
  certBorder2: { position: "absolute", inset: "12px", border: "2px solid #fb923c", pointerEvents: "none" },
  certBorder3: { position: "absolute", inset: "16px", border: "1px solid #fed7aa", pointerEvents: "none" },
  watermark: { position: "absolute", inset: "0", display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none", opacity: 0.04, zIndex: 0 },
  watermarkText: { fontSize: "120px", color: "#ea580c", transform: "rotate(-30deg)", userSelect: "none", fontFamily: "'Noto Sans Devanagari', serif" },
  content: { position: "relative", zIndex: 1 },
  headerWrap: { textAlign: "center", borderBottom: "2px solid #7c2d12", paddingBottom: "16px", marginBottom: "16px" },
  headerRow: { display: "flex", alignItems: "center", justifyContent: "center", gap: "16px", marginBottom: "8px" },
  lotus: { fontSize: "28px", color: "#c2410c" },
  schoolName: { fontFamily: "'Cinzel','Georgia',serif", fontSize: "22px", fontWeight: "700", color: "#7c2d12", letterSpacing: "2px", margin: "0 0 2px" },
  tagline: { fontSize: "12px", color: "#b45309", fontFamily: "'Noto Sans Devanagari',serif", letterSpacing: "2px", margin: "0 0 4px" },
  address: { fontSize: "10px", color: "#6b7280", margin: "2px 0" },
  dividerRow: { display: "flex", alignItems: "center", gap: "8px", marginTop: "8px" },
  dividerLine: { flex: 1, height: "1px", background: "linear-gradient(to right, transparent, #f97316, #c2410c)" },
  dividerLineRev: { flex: 1, height: "1px", background: "linear-gradient(to left, transparent, #f97316, #c2410c)" },
  dividerSymbol: { fontSize: "11px", color: "#ea580c", fontFamily: "'Noto Sans Devanagari',serif" },
  banner: { textAlign: "center", marginBottom: "16px" },
  bannerSpan: { display: "inline-block", background: "#c2410c", color: "#fff", fontSize: "11px", fontWeight: "700", letterSpacing: "3px", padding: "5px 20px", borderRadius: "20px" },
  metaRow: { display: "flex", justifyContent: "space-between", fontSize: "11px", color: "#6b7280", marginBottom: "14px" },
  label: { fontWeight: "700", color: "#374151" },
  toLine: { fontSize: "12px", marginBottom: "4px" },
  toValue: { fontSize: "12px", color: "#374151", marginBottom: "12px", paddingLeft: "16px" },
  subjectLine: { fontSize: "12px", marginBottom: "12px" },
  underline: { textDecoration: "underline" },
  body: { fontSize: "12px", color: "#374151", lineHeight: "1.8", whiteSpace: "pre-wrap", marginBottom: "24px", flex: 1 },
  sigWrap: { display: "flex", justifyContent: "flex-end", marginTop: "auto" },
  sigBox: { textAlign: "center", minWidth: "160px" },
  sigLine: { height: "40px", borderBottom: "1px solid #9ca3af", marginBottom: "4px" },
  sigName: { fontSize: "12px", fontWeight: "600", color: "#1f2937" },
  sigRole: { fontSize: "11px", color: "#6b7280" },
  footer: { marginTop: "24px", borderTop: "1px solid #fed7aa", paddingTop: "10px" },
  footerDivRow: { display: "flex", alignItems: "center", gap: "8px" },
  footerText: { textAlign: "center", fontSize: "9px", color: "#9ca3af", marginTop: "4px" },
  certTitle: { textAlign: "center", margin: "16px 0" },
  certTitleRow: { display: "flex", alignItems: "center", gap: "12px", justifyContent: "center", marginBottom: "4px" },
  certTitleText: { fontFamily: "'Cinzel','Georgia',serif", fontSize: "18px", fontWeight: "700", color: "#7c2d12", letterSpacing: "3px", textTransform: "uppercase" },
  certShloka: { fontSize: "12px", color: "#ea580c", fontFamily: "'Noto Sans Devanagari',serif" },
  certifiedWrap: { textAlign: "center", margin: "16px 0" },
  certifiedLabel: { fontSize: "11px", color: "#9ca3af", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "8px" },
  recipientName: { fontFamily: "'Cinzel','Georgia',serif", fontSize: "28px", fontWeight: "700", color: "#7c2d12", padding: "4px 32px", borderBottom: "1px solid #f97316", display: "inline-block" },
  certBody: { textAlign: "center", fontSize: "12px", color: "#374151", lineHeight: "1.8", padding: "0 24px", margin: "12px 0", whiteSpace: "pre-wrap" },
  certDate: { textAlign: "center", fontSize: "11px", color: "#6b7280", marginTop: "8px" },
  sigsRow: { display: "flex", justifyContent: "space-between", alignItems: "flex-end", padding: "0 16px", marginTop: "auto", paddingTop: "32px" },
  sealBox: { textAlign: "center" },
  sealCircle: { width: "56px", height: "56px", borderRadius: "50%", border: "1px solid #fed7aa", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 4px", fontSize: "10px", color: "#d1d5db", fontFamily: "'Noto Sans Devanagari',serif" },
  cornerOrnament: { position: "absolute", fontSize: "20px", color: "#fb923c", fontFamily: "'Noto Sans Devanagari',serif", pointerEvents: "none" },
};

// ─── Preview components with fully inline styles ───────────────────────────────

const Header = ({ lang }) => {
  const t = L[lang];
  return (
    <div style={s.headerWrap}>
      <div style={s.headerRow}>
        <span style={s.lotus}>🪷</span>
        <div>
          <p style={s.schoolName}>PRATAP SARASWATI VIDYA MANDIR</p>
          <p style={s.tagline}>{t.tagline}</p>
          <p style={s.address}>108, Saraswati Marg, Bengaluru – 560001</p>
          <p style={s.address}>+91 98765 43210 &nbsp;|&nbsp; hello@psvidyamandir.in</p>
        </div>
        <span style={s.lotus}>🪷</span>
      </div>
      <div style={s.dividerRow}>
        <div style={s.dividerLine} />
        <span style={s.dividerSymbol}>✦ ॐ ✦</span>
        <div style={s.dividerLineRev} />
      </div>
    </div>
  );
};

const Footer = ({ lang }) => {
  const t = L[lang];
  return (
    <div style={s.footer}>
      <div style={s.footerDivRow}>
        <div style={s.dividerLine} />
        <span style={{ ...s.dividerSymbol, fontSize: "10px" }}>{t.blessing}</span>
        <div style={s.dividerLineRev} />
      </div>
      <p style={s.footerText}>{t.footer}</p>
    </div>
  );
};

const CircularPreview = ({ f }) => {
  const t = L[f.lang];
  const isNotice = f.docType === "notice";
  return (
    <div style={s.page}>
      <div style={s.outerBorder} />
      <div style={s.innerBorder} />
      <div style={s.watermark}><span style={s.watermarkText}>विद्यालय</span></div>
      <div style={s.content}>
        <Header lang={f.lang} />
        <div style={s.banner}>
          <span style={s.bannerSpan}>{isNotice ? (f.lang === "hi" ? "सूचना" : "NOTICE") : (f.lang === "hi" ? "परिपत्र" : "CIRCULAR")}</span>
        </div>
        <div style={s.metaRow}>
          <span><span style={s.label}>{t.refNo}:</span> {f.refNo || "VID/2025-26/001"}</span>
          <span><span style={s.label}>{t.date}:</span> {f.date}</span>
        </div>
        <p style={s.toLine}><span style={s.label}>{t.to}:</span></p>
        <p style={s.toValue}>{f.to || "All Parents & Students"}</p>
        <p style={s.subjectLine}>
          <span style={s.label}>{t.subject}:</span>{" "}
          <span style={s.underline}>{f.subject || (f.lang === "hi" ? "परिपत्र का विषय" : "Subject of the circular")}</span>
        </p>
        <div style={s.body}>{f.body || (f.lang === "hi" ? "प्रिय अभिभावकों एवं विद्यार्थियों,\n\nआपको सूचित किया जाता है कि..." : "Dear Parents and Students,\n\nThis is to inform you that...")}</div>
        <div style={s.sigWrap}>
          <div style={s.sigBox}>
            <div style={s.sigLine} />
            <p style={s.sigName}>{f.issuedBy || "Dr. Arvind Krishnan"}</p>
            <p style={s.sigRole}>{f.designation || t.principal}</p>
            <p style={{ ...s.sigRole, color: "#9ca3af" }}>Pratap Saraswati Vidya Mandir</p>
          </div>
        </div>
        <Footer lang={f.lang} />
      </div>
    </div>
  );
};

const CertificatePreview = ({ f }) => {
  const t = L[f.lang];
  return (
    <div style={s.certPage}>
      <div style={s.certBorder1} />
      <div style={s.certBorder2} />
      <div style={s.certBorder3} />
      {[{ top: "16px", left: "16px" }, { top: "16px", right: "16px" }, { bottom: "16px", left: "16px" }, { bottom: "16px", right: "16px" }].map((pos, i) => (
        <div key={i} style={{ ...s.cornerOrnament, ...pos }}>✦</div>
      ))}
      <div style={s.watermark}><span style={{ ...s.watermarkText, fontSize: "100px" }}>विद्यालय</span></div>
      <div style={s.content}>
        <Header lang={f.lang} />
        <div style={s.certTitle}>
          <div style={s.certTitleRow}>
            <div style={s.dividerLine} />
            <span style={s.certTitleText}>{f.certType || "Certificate of Achievement"}</span>
            <div style={s.dividerLineRev} />
          </div>
          <p style={s.certShloka}>{t.shloka}</p>
        </div>
        <div style={s.certifiedWrap}>
          <p style={s.certifiedLabel}>{t.certifiedThat}</p>
          <span style={s.recipientName}>{f.recipientName || (f.lang === "hi" ? "विद्यार्थी का नाम" : "Student Name")}</span>
        </div>
        <div style={s.certBody}>{f.certBody || (f.lang === "hi" ? "ने शैक्षणिक वर्ष 2025–26 में उत्कृष्ट प्रदर्शन और समर्पण का परिचय दिया है।" : "has successfully demonstrated outstanding performance and dedication in academics and co-curricular activities during the academic year 2025–26.")}</div>
        <p style={s.certDate}>{t.date}: <strong>{f.certDate}</strong></p>
        <div style={s.sigsRow}>
          <div style={s.sigBox}>
            <div style={s.sigLine} />
            <p style={s.sigName}>{f.principalName || "Dr. Arvind Krishnan"}</p>
            <p style={s.sigRole}>{t.principal}</p>
          </div>
          <div style={s.sealBox}>
            <div style={s.sealCircle}>मुद्रा</div>
            <p style={{ fontSize: "10px", color: "#9ca3af" }}>{t.schoolSeal}</p>
          </div>
          <div style={s.sigBox}>
            <div style={s.sigLine} />
            <p style={s.sigName}>{f.chairmanName || "Shri Ramesh Gupta"}</p>
            <p style={s.sigRole}>{t.chairman}</p>
          </div>
        </div>
        <Footer lang={f.lang} />
      </div>
    </div>
  );
};

// ─── Print function — generates self-contained HTML with all styles inlined ────
const buildPrintHTML = (f) => {
  const t = L[f.lang];
  const isCircular = f.docType !== "certificate";
  const isNotice = f.docType === "notice";

  const headerHTML = `
    <div style="text-align:center;border-bottom:2px solid #7c2d12;padding-bottom:16px;margin-bottom:16px;">
      <div style="display:flex;align-items:center;justify-content:center;gap:16px;margin-bottom:8px;">
        <span style="font-size:28px;color:#c2410c;">🪷</span>
        <div>
          <p style="font-family:'Cinzel','Georgia',serif;font-size:22px;font-weight:700;color:#7c2d12;letter-spacing:2px;margin:0 0 2px;">PRATAP SARASWATI VIDYA MANDIR</p>
          <p style="font-size:12px;color:#b45309;letter-spacing:2px;margin:0 0 4px;">${t.tagline}</p>
          <p style="font-size:10px;color:#6b7280;margin:2px 0;">108, Saraswati Marg, Bengaluru – 560001</p>
          <p style="font-size:10px;color:#6b7280;margin:2px 0;">+91 98765 43210 &nbsp;|&nbsp; hello@psvidyamandir.in</p>
        </div>
        <span style="font-size:28px;color:#c2410c;">🪷</span>
      </div>
      <div style="display:flex;align-items:center;gap:8px;margin-top:8px;">
        <div style="flex:1;height:1px;background:linear-gradient(to right,transparent,#f97316,#c2410c);"></div>
        <span style="font-size:11px;color:#ea580c;">✦ ॐ ✦</span>
        <div style="flex:1;height:1px;background:linear-gradient(to left,transparent,#f97316,#c2410c);"></div>
      </div>
    </div>`;

  const footerHTML = `
    <div style="margin-top:24px;border-top:1px solid #fed7aa;padding-top:10px;">
      <div style="display:flex;align-items:center;gap:8px;">
        <div style="flex:1;height:1px;background:linear-gradient(to right,transparent,#f97316,#c2410c);"></div>
        <span style="font-size:10px;color:#ea580c;">${t.blessing}</span>
        <div style="flex:1;height:1px;background:linear-gradient(to left,transparent,#f97316,#c2410c);"></div>
      </div>
      <p style="text-align:center;font-size:9px;color:#9ca3af;margin-top:4px;">${t.footer}</p>
    </div>`;

  const circularBody = `
    <div style="text-align:center;margin-bottom:16px;">
      <span style="display:inline-block;background:#c2410c;color:#fff;font-size:11px;font-weight:700;letter-spacing:3px;padding:5px 20px;border-radius:20px;">
        ${isNotice ? (f.lang === "hi" ? "सूचना" : "NOTICE") : (f.lang === "hi" ? "परिपत्र" : "CIRCULAR")}
      </span>
    </div>
    <div style="display:flex;justify-content:space-between;font-size:11px;color:#6b7280;margin-bottom:14px;">
      <span><strong>${t.refNo}:</strong> ${f.refNo || "VID/2025-26/001"}</span>
      <span><strong>${t.date}:</strong> ${f.date}</span>
    </div>
    <p style="font-size:12px;margin-bottom:4px;"><strong>${t.to}:</strong></p>
    <p style="font-size:12px;color:#374151;margin-bottom:12px;padding-left:16px;">${f.to || "All Parents & Students"}</p>
    <p style="font-size:12px;margin-bottom:12px;"><strong>${t.subject}:</strong> <span style="text-decoration:underline;">${f.subject || ""}</span></p>
    <div style="font-size:12px;color:#374151;line-height:1.8;white-space:pre-wrap;margin-bottom:40px;">${f.body || ""}</div>
    <div style="display:flex;justify-content:flex-end;margin-top:auto;">
      <div style="text-align:center;min-width:160px;">
        <div style="height:40px;border-bottom:1px solid #9ca3af;margin-bottom:4px;"></div>
        <p style="font-size:12px;font-weight:600;color:#1f2937;">${f.issuedBy || "Dr. Arvind Krishnan"}</p>
        <p style="font-size:11px;color:#6b7280;">${f.designation || t.principal}</p>
        <p style="font-size:11px;color:#9ca3af;">Pratap Saraswati Vidya Mandir</p>
      </div>
    </div>`;

  const certBody = `
    <div style="text-align:center;margin:16px 0;">
      <div style="display:flex;align-items:center;gap:12px;justify-content:center;margin-bottom:4px;">
        <div style="flex:1;height:1px;background:linear-gradient(to right,transparent,#f97316);"></div>
        <span style="font-family:'Cinzel','Georgia',serif;font-size:18px;font-weight:700;color:#7c2d12;letter-spacing:3px;text-transform:uppercase;">${f.certType || "Certificate of Achievement"}</span>
        <div style="flex:1;height:1px;background:linear-gradient(to left,transparent,#f97316);"></div>
      </div>
      <p style="font-size:12px;color:#ea580c;">${t.shloka}</p>
    </div>
    <div style="text-align:center;margin:16px 0;">
      <p style="font-size:11px;color:#9ca3af;letter-spacing:3px;text-transform:uppercase;margin-bottom:8px;">${t.certifiedThat}</p>
      <span style="font-family:'Cinzel','Georgia',serif;font-size:28px;font-weight:700;color:#7c2d12;padding:4px 32px;border-bottom:1px solid #f97316;display:inline-block;">${f.recipientName || "Student Name"}</span>
    </div>
    <div style="text-align:center;font-size:12px;color:#374151;line-height:1.8;padding:0 24px;margin:12px 0;white-space:pre-wrap;">${f.certBody || ""}</div>
    <p style="text-align:center;font-size:11px;color:#6b7280;margin-top:8px;">${t.date}: <strong>${f.certDate}</strong></p>
    <div style="display:flex;justify-content:space-between;align-items:flex-end;padding:0 16px;margin-top:40px;">
      <div style="text-align:center;min-width:140px;">
        <div style="height:40px;border-bottom:1px solid #9ca3af;margin-bottom:4px;"></div>
        <p style="font-size:11px;font-weight:600;color:#1f2937;">${f.principalName || "Dr. Arvind Krishnan"}</p>
        <p style="font-size:10px;color:#6b7280;">${t.principal}</p>
      </div>
      <div style="text-align:center;">
        <div style="width:56px;height:56px;border-radius:50%;border:1px solid #fed7aa;display:flex;align-items:center;justify-content:center;margin:0 auto 4px;font-size:10px;color:#d1d5db;">मुद्रा</div>
        <p style="font-size:10px;color:#9ca3af;">${t.schoolSeal}</p>
      </div>
      <div style="text-align:center;min-width:140px;">
        <div style="height:40px;border-bottom:1px solid #9ca3af;margin-bottom:4px;"></div>
        <p style="font-size:11px;font-weight:600;color:#1f2937;">${f.chairmanName || "Shri Ramesh Gupta"}</p>
        <p style="font-size:10px;color:#6b7280;">${t.chairman}</p>
      </div>
    </div>`;

  const pageStyle = isCircular
    ? `background:#fff;padding:40px;min-height:900px;position:relative;box-sizing:border-box;font-family:'Georgia','Times New Roman',serif;font-size:13px;color:#1a1a1a;`
    : `background:linear-gradient(135deg,#fffbf0 0%,#fff8e7 50%,#fffbf0 100%);padding:40px;min-height:900px;position:relative;box-sizing:border-box;font-family:'Georgia','Times New Roman',serif;font-size:13px;color:#1a1a1a;`;

  const borders = isCircular
    ? `<div style="position:absolute;inset:8px;border:1px solid #fed7aa;border-radius:4px;pointer-events:none;"></div>
       <div style="position:absolute;inset:14px;border:1px solid #ffedd5;border-radius:4px;pointer-events:none;"></div>`
    : `<div style="position:absolute;inset:0;border:12px solid #ffedd5;pointer-events:none;"></div>
       <div style="position:absolute;inset:12px;border:2px solid #fb923c;pointer-events:none;"></div>
       <div style="position:absolute;inset:16px;border:1px solid #fed7aa;pointer-events:none;"></div>
       <div style="position:absolute;top:16px;left:16px;font-size:20px;color:#fb923c;pointer-events:none;">✦</div>
       <div style="position:absolute;top:16px;right:16px;font-size:20px;color:#fb923c;pointer-events:none;">✦</div>
       <div style="position:absolute;bottom:16px;left:16px;font-size:20px;color:#fb923c;pointer-events:none;">✦</div>
       <div style="position:absolute;bottom:16px;right:16px;font-size:20px;color:#fb923c;pointer-events:none;">✦</div>`;

  return `<!DOCTYPE html>
<html lang="${f.lang}">
<head>
  <meta charset="UTF-8"/>
  <title>${isCircular ? `${f.docType} - ${f.subject}` : f.certType}</title>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Noto+Sans+Devanagari:wght@400;600&display=swap" rel="stylesheet"/>
  <style>
    * { margin:0; padding:0; box-sizing:border-box; }
    body { background:#f3f4f6; display:flex; justify-content:center; padding:20px; }
    .page { width:794px; }
    @media print {
      body { background:#fff; padding:0; }
      .page { width:100%; }
      @page { margin:0; size:A4; }
    }
  </style>
</head>
<body>
  <div class="page">
    <div style="${pageStyle}">
      ${borders}
      <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;pointer-events:none;opacity:0.04;z-index:0;">
        <span style="font-size:${isCircular ? "120" : "100"}px;color:#ea580c;transform:rotate(-30deg);user-select:none;font-family:'Noto Sans Devanagari',serif;">विद्यालय</span>
      </div>
      <div style="position:relative;z-index:1;">
        ${headerHTML}
        ${isCircular ? circularBody : certBody}
        ${footerHTML}
      </div>
    </div>
  </div>
</body>
</html>`;
};

// ─── Main Page ─────────────────────────────────────────────────────────────────
const AdminCircular = () => {
  const [form, setForm] = useState(defaultForm);
  const [translating, setTranslating] = useState(false);
  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));
  const isCircular = form.docType !== "certificate";

  // Translate all text fields in the current direction
  const handleTranslate = async () => {
    setTranslating(true);
    const targetLang = form.lang === "en" ? "hi" : "en";
    const langpair = form.lang === "en" ? "en|hi" : "hi|en";
    try {
      if (isCircular) {
        const result = await translateFields(
          { to: form.to, subject: form.subject, body: form.body, issuedBy: form.issuedBy, designation: form.designation },
          langpair
        );
        setForm(f => ({ ...f, ...result, lang: targetLang }));
      } else {
        const result = await translateFields(
          { recipientName: form.recipientName, certBody: form.certBody, principalName: form.principalName, chairmanName: form.chairmanName },
          langpair
        );
        setForm(f => ({ ...f, ...result, lang: targetLang }));
      }
    } finally {
      setTranslating(false);
    }
  };

  const handlePrint = () => {
    const html = buildPrintHTML(form);
    const win = window.open("", "_blank");
    if (!win) return;
    win.document.write(html);
    win.document.close();
    win.focus();
    setTimeout(() => { win.print(); }, 800);
  };

  return (
    <AdminPageShell
      title="Circular & Certificate Builder"
      subtitle="Fill fields on the left — live preview on the right — print as styled PDF"
    >
      <div className="grid lg:grid-cols-2 gap-6 items-start">

        {/* ── Left: Form ── */}
        <div className="space-y-5">

          {/* Doc type + Language */}
          <div className="rounded-2xl border border-gold/20 bg-card p-5 shadow-soft space-y-4">
            <div>
              <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3 block">Document Type</Label>
              <div className="grid grid-cols-3 gap-2">
                {(["circular", "notice", "certificate"]).map(type => (
                  <button key={type} onClick={() => set("docType", type)}
                    className={`py-2.5 rounded-xl text-sm font-semibold capitalize border transition-all ${
                      form.docType === type ? "bg-primary text-white border-primary shadow-gold" : "border-gold/25 text-muted-foreground hover:border-primary/40 hover:text-foreground"
                    }`}>{type}</button>
                ))}
              </div>
            </div>
            <div>
              <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3 block flex items-center gap-1.5">
                <Globe className="h-3.5 w-3.5" /> Language / भाषा
              </Label>
              <div className="grid grid-cols-2 gap-2">
                {([["en", "English"], ["hi", "हिंदी"]]).map(([val, label]) => (
                  <button key={val} onClick={() => set("lang", val)}
                    className={`py-2.5 rounded-xl text-sm font-semibold border transition-all ${
                      form.lang === val ? "bg-primary text-white border-primary shadow-gold" : "border-gold/25 text-muted-foreground hover:border-primary/40 hover:text-foreground"
                    }`}>{label}</button>
                ))}
              </div>
            </div>
          </div>

          {/* Fields */}
          <div className="rounded-2xl border border-gold/20 bg-card overflow-hidden shadow-soft">
            <div className="h-1 w-full bg-gradient-festive" />
            <div className="p-5 space-y-4">
              {isCircular ? (
                <>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{form.lang === "hi" ? "संदर्भ संख्या" : "Ref No."}</Label>
                      <Input value={form.refNo} onChange={e => set("refNo", e.target.value)} className="mt-1.5 border-gold/25" placeholder="VID/2025-26/001" />
                    </div>
                    <div>
                      <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{form.lang === "hi" ? "दिनांक" : "Date"}</Label>
                      <Input value={form.date} onChange={e => set("date", e.target.value)} className="mt-1.5 border-gold/25" />
                    </div>
                  </div>
                  <div>
                    <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{form.lang === "hi" ? "प्रति" : "To (Recipient)"}</Label>
                    <Input value={form.to} onChange={e => set("to", e.target.value)} className="mt-1.5 border-gold/25" placeholder={form.lang === "hi" ? "सभी अभिभावक एवं विद्यार्थी" : "All Parents & Students"} />
                  </div>
                  <div>
                    <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{form.lang === "hi" ? "विषय" : "Subject"}</Label>
                    <Input value={form.subject} onChange={e => set("subject", e.target.value)} className="mt-1.5 border-gold/25" placeholder={form.lang === "hi" ? "परिपत्र का विषय" : "e.g. Annual Sports Day"} />
                  </div>
                  <div>
                    <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{form.lang === "hi" ? "विषय-वस्तु" : "Body / Content"}</Label>
                    <Textarea rows={8} value={form.body} onChange={e => set("body", e.target.value)} className="mt-1.5 border-gold/25 resize-none"
                      placeholder={form.lang === "hi" ? "प्रिय अभिभावकों एवं विद्यार्थियों,\n\nआपको सूचित किया जाता है कि..." : "Dear Parents and Students,\n\nThis is to inform you that..."} />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{form.lang === "hi" ? "जारीकर्ता" : "Issued By"}</Label>
                      <Input value={form.issuedBy} onChange={e => set("issuedBy", e.target.value)} className="mt-1.5 border-gold/25" />
                    </div>
                    <div>
                      <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{form.lang === "hi" ? "पदनाम" : "Designation"}</Label>
                      <Input value={form.designation} onChange={e => set("designation", e.target.value)} className="mt-1.5 border-gold/25" />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{form.lang === "hi" ? "प्रमाण-पत्र प्रकार" : "Certificate Type"}</Label>
                    <div className="relative mt-1.5">
                      <select value={form.certType} onChange={e => set("certType", e.target.value)}
                        className="w-full appearance-none rounded-md border border-gold/25 bg-background px-3 py-2 pr-9 text-sm focus:outline-none focus:ring-1 focus:ring-primary">
                        <option>Certificate of Achievement</option>
                        <option>Certificate of Participation</option>
                        <option>Certificate of Merit</option>
                        <option>Certificate of Excellence</option>
                        <option>Appreciation Certificate</option>
                        <option>Sports Achievement Certificate</option>
                        <option>Cultural Achievement Certificate</option>
                        {form.lang === "hi" && <>
                          <option>उत्कृष्टता प्रमाण-पत्र</option>
                          <option>सहभागिता प्रमाण-पत्र</option>
                          <option>खेल उपलब्धि प्रमाण-पत्र</option>
                          <option>सांस्कृतिक उपलब्धि प्रमाण-पत्र</option>
                        </>}
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                  <div>
                    <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{form.lang === "hi" ? "प्राप्तकर्ता का नाम" : "Recipient Name"}</Label>
                    <Input value={form.recipientName} onChange={e => set("recipientName", e.target.value)} className="mt-1.5 border-gold/25" placeholder={form.lang === "hi" ? "विद्यार्थी / शिक्षक का नाम" : "Student / Teacher Name"} />
                  </div>
                  <div>
                    <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{form.lang === "hi" ? "प्रमाण-पत्र विवरण" : "Certificate Body"}</Label>
                    <Textarea rows={5} value={form.certBody} onChange={e => set("certBody", e.target.value)} className="mt-1.5 border-gold/25 resize-none"
                      placeholder={form.lang === "hi" ? "ने शैक्षणिक वर्ष 2025–26 में उत्कृष्ट प्रदर्शन किया है।" : "has successfully demonstrated outstanding performance..."} />
                  </div>
                  <div>
                    <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{form.lang === "hi" ? "दिनांक" : "Date"}</Label>
                    <Input value={form.certDate} onChange={e => set("certDate", e.target.value)} className="mt-1.5 border-gold/25" />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{form.lang === "hi" ? "प्रधानाचार्य का नाम" : "Principal Name"}</Label>
                      <Input value={form.principalName} onChange={e => set("principalName", e.target.value)} className="mt-1.5 border-gold/25" />
                    </div>
                    <div>
                      <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{form.lang === "hi" ? "अध्यक्ष का नाम" : "Chairman Name"}</Label>
                      <Input value={form.chairmanName} onChange={e => set("chairmanName", e.target.value)} className="mt-1.5 border-gold/25" />
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 flex-wrap">
            <Button onClick={handlePrint} variant="hero" className="flex-1 gap-2">
              <Printer className="h-4 w-4" /> {form.lang === "hi" ? "प्रिंट / PDF सहेजें" : "Print / Save PDF"}
            </Button>
            <Button onClick={handleTranslate} disabled={translating} variant="outline"
              className="gap-1.5 border-violet-300 text-violet-700 hover:bg-violet-50 flex-1"
            >
              {translating
                ? <><Loader2 className="h-4 w-4 animate-spin" /> Translating…</>
                : <><Languages className="h-4 w-4" />
                    {form.lang === "en" ? "Convert to Hindi" : "Convert to English"}
                  </>
              }
            </Button>
            <Button onClick={() => setForm(defaultForm)} variant="outline" className="gap-2">
              <RefreshCw className="h-4 w-4" /> Reset
            </Button>
          </div>
        </div>

        {/* ── Right: Live Preview ── */}
        <div className="sticky top-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold text-secondary">Live Preview</span>
            </div>
            <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
              {form.lang === "hi" ? "हिंदी" : "English"} · A4
            </span>
          </div>
          <motion.div
            key={form.docType + form.lang}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="rounded-2xl overflow-hidden border border-gold/20 shadow-warm"
          >
            {isCircular ? <CircularPreview f={form} /> : <CertificatePreview f={form} />}
          </motion.div>
        </div>

      </div>
    </AdminPageShell>
  );
};

export default AdminCircular;