 
import { motion } from "framer-motion";
import { PageHero } from "@/components/PageHero";
import { SectionHeader } from "@/components/SectionHeader";
import { feeRecords } from "@/data/schoolData";
import { Wallet, Info, CheckCircle2 } from "lucide-react";
import heroAdmissions from "@/assets/hero-admissions.jpg";
import { useLanguage } from "@/contexts/LanguageContext";

const Fees = () => {
  const { t } = useLanguage();

  const paymentModes = [
    t("fees.pay1"),
    t("fees.pay2"),
    t("fees.pay3"),
    t("fees.pay4"),
  ];

  return (
    <>
      <PageHero
        title={t("fees.heroTitle")}
        sanskrit="॥ शुल्क विवरण ॥"
        subtitle={t("fees.heroSubtitle")}
        image={heroAdmissions}
        size="full"
      />

      <section className="container-narrow py-16">
        <SectionHeader
          eyebrow={t("fees.eyebrow")}
          title={t("fees.sectionTitle")}
          subtitle={t("fees.sectionSubtitle")}
        />

        {/* Fee table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          className="bg-card rounded-3xl border border-gold/20 overflow-hidden shadow-warm"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gradient-to-r from-primary via-orange-600 to-amber-600 text-white">
                  <th className="text-left px-6 py-4 font-display font-bold text-base">{t("fees.colClass")}</th>
                  <th className="text-left px-6 py-4 font-display font-bold text-base">{t("fees.colTuition")}</th>
                  <th className="text-left px-6 py-4 font-display font-bold text-base">{t("fees.colAdmission")}</th>
                  <th className="text-left px-6 py-4 font-display font-bold text-base">{t("fees.colExam")}</th>
                  <th className="text-left px-6 py-4 font-display font-bold text-base">{t("fees.colOther")}</th>
                  <th className="text-left px-6 py-4 font-display font-bold text-base bg-white/10">{t("fees.colTotal")}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gold/10">
                {feeRecords.map((fee, i) => (
                  <motion.tr
                    key={fee.id}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.05 }}
                    transition={{ delay: i * 0.06 }}
                    className="hover:bg-primary/5 transition-colors group"
                  >
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-amber-500/20 text-primary font-display font-bold text-sm group-hover:scale-110 transition-transform">
                          {i + 1}
                        </div>
                        <span className="font-display font-semibold text-secondary text-base">{fee.className}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className="font-semibold text-foreground/90">{fee.tuition}</span>
                    </td>
                    <td className="px-6 py-5">
                      <span className="font-semibold text-foreground/90">{fee.admission}</span>
                    </td>
                    <td className="px-6 py-5">
                      <span className="font-semibold text-foreground/90">{fee.exam}</span>
                    </td>
                    <td className="px-6 py-5">
                      <span className="font-semibold text-foreground/90">{fee.other}</span>
                    </td>
                    <td className="px-6 py-5 bg-primary/5">
                      <span className="font-bold text-primary text-base">{fee.total}</span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Note */}
        <div className="mt-5 flex items-start gap-3 text-sm text-foreground/70 bg-amber-50 border border-amber-200 rounded-2xl px-5 py-4">
          <Info className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
          <p className="leading-relaxed">{t("fees.note")}</p>
        </div>
      </section>

      {/* Payment modes */}
      <section className="container-narrow pb-16">
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            className="bg-card rounded-3xl border border-gold/20 p-7 shadow-soft"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="p-3 rounded-xl bg-gradient-saffron text-white shadow-gold">
                <Wallet className="h-6 w-6" />
              </div>
              <h3 className="font-display text-2xl text-secondary">{t("fees.paymentTitle")}</h3>
            </div>
            <ul className="space-y-3.5">
              {paymentModes.map((mode, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-foreground/80 leading-relaxed">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  {mode}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            className="bg-gradient-festive text-primary-foreground rounded-3xl p-7 shadow-warm flex flex-col justify-between relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(43_95%_88%/0.25),transparent_50%)]" />
            <div className="relative z-10">
              <p className="font-sanskrit text-xl text-gold mb-3">॥ विद्यार्थी सर्वोपरि ॥</p>
              <h3 className="font-display text-2xl md:text-3xl font-bold mb-3">{t("fees.scholarshipTitle")}</h3>
              <p className="opacity-90 text-sm leading-relaxed">{t("fees.scholarshipDesc")}</p>
            </div>
            <a
              href="/contact"
              className="relative z-10 mt-6 inline-flex items-center justify-center px-6 py-3 rounded-xl bg-white/20 hover:bg-white/30 border border-white/30 text-sm font-semibold transition-all shadow-md hover:shadow-lg"
            >
              {t("fees.scholarshipCta")}
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Fees;