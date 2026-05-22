import Image from "next/image"
import Link from "next/link"
import { CalendarHeart, Mail, Sparkles } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const highlights = [
  "Thiệp cưới online tinh tế",
  "Quản lý khách mời gọn gàng",
  "Lưu giữ khoảnh khắc ngày vui",
]

export default function Page() {
  return (
    <main className="relative min-h-svh overflow-hidden bg-[#f8f4ef] text-[#241d1c]">
      <Image
        src="/coming-soon-hero.png"
        alt="Bàn tiệc cưới với hoa và nhẫn"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[62%_50%]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(248,244,239,0.98)_0%,rgba(248,244,239,0.86)_42%,rgba(248,244,239,0.36)_72%,rgba(248,244,239,0.12)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#f8f4ef] to-transparent" />

      <section className="relative z-10 flex min-h-svh items-center px-5 py-8 sm:px-8 lg:px-14">
        <div className="w-full max-w-6xl">
          <nav className="mb-16 flex items-center justify-between text-sm sm:mb-20">
            <Link href="/" className="font-semibold text-[#241d1c]">
              awedding
            </Link>
            <span className="rounded-full border border-[#9f6b63]/30 bg-white/45 px-3 py-1 text-xs font-medium text-[#7b4d48] backdrop-blur">
              Coming soon
            </span>
          </nav>

          <div className="max-w-2xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#c8a35f]/35 bg-white/55 px-3 py-1 text-xs font-medium uppercase text-[#7a6434] backdrop-blur">
              <Sparkles className="size-3.5" aria-hidden="true" />
              Đang chuẩn bị ra mắt
            </div>

            <h1 className="max-w-xl text-5xl font-semibold leading-[1.04] text-[#241d1c] sm:text-6xl lg:text-7xl">
              Ngày vui của bạn sắp có một cách kể mới.
            </h1>

            <p className="mt-6 max-w-lg text-base leading-8 text-[#5d5552] sm:text-lg">
              awedding đang hoàn thiện không gian tạo thiệp cưới, quản lý khách
              mời và lưu lại những chi tiết đẹp nhất cho ngày trọng đại.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="mailto:hello@awedding.vn?subject=T%C3%B4i%20mu%E1%BB%91n%20nh%E1%BA%ADn%20tin%20awedding"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "h-11 rounded-full bg-[#2f5951] px-5 text-white hover:bg-[#244840]"
                )}
              >
                <Mail className="size-4" aria-hidden="true" />
                Nhận tin ra mắt
              </a>
              <a
                href="mailto:hello@awedding.vn?subject=T%C6%B0%20v%E1%BA%A5n%20awedding"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "h-11 rounded-full border-[#9f6b63]/35 bg-white/55 px-5 text-[#5d3835] backdrop-blur hover:bg-white/75"
                )}
              >
                <CalendarHeart className="size-4" aria-hidden="true" />
                Liên hệ tư vấn
              </a>
            </div>

            <div className="mt-12 grid max-w-3xl gap-3 sm:grid-cols-3">
              {highlights.map((item) => (
                <div
                  key={item}
                  className="border-l border-[#c8a35f]/45 bg-white/35 px-4 py-3 text-sm font-medium leading-6 text-[#5b5049] backdrop-blur"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
