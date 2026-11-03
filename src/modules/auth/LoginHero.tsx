import Image from "next/image"

const HIGHLIGHTS = [
  { title: "Explainable AI", subtitle: "Traceable Decisions" },
  { title: "Audit Preparation", subtitle: "Full gap assessment" },
  { title: "Regulatory Expansion", subtitle: "Global Compliance" },
]

export function LoginHero() {
  return (
    <section className="relative hidden overflow-hidden text-white lg:block">
      <Image
        src="/images/login-hero.png"
        alt=""
        fill
        sizes="(min-width: 1024px) 65vw, 0px"
        className="object-cover object-left"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-linear-to-l from-brand-deep/25 from-25% to-brand-deep/90 to-90%"
      />

      <div className="relative flex h-full flex-col justify-between p-8 xl:p-12">
        <Image
          src="/images/logo-white.svg"
          alt="Top Quality Engineering"
          width={236}
          height={50}
          className="self-start"
        />

        <div className="flex max-w-182 flex-col gap-7">
          <p className="w-fit rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium">
            <span aria-hidden className="mr-1.5 text-xl leading-none text-success">
              •
            </span>
            Compliance Intelligence
          </p>
          <div className="flex flex-col gap-4">
            <p className="text-4xl font-extrabold 2xl:text-[3.375rem]">
              Compliance intelligence
              <br />
              that explains itself.
            </p>
            <p className="text-lg font-medium text-white/70 2xl:text-xl">
              Upload your Quality Management System and receive clause-level assessments, audit
              readiness insights, and evidence-based recommendations in minutes.
            </p>
          </div>
        </div>

        <ul className="flex gap-6 xl:gap-8 2xl:gap-12">
          {HIGHLIGHTS.map((item) => (
            <li key={item.title} className="flex flex-col gap-2.5">
              <span className="text-base font-semibold xl:text-xl 2xl:text-3xl">{item.title}</span>
              <span className="text-sm text-white/70 xl:text-base 2xl:text-lg">
                {item.subtitle}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
