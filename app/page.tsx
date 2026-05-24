"use client"

import { ContactShadows, Environment, Float, Text } from "@react-three/drei"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import {
  CalendarHeart,
  Check,
  ChevronRight,
  Gem,
  HeartHandshake,
  Mail,
  MapPin,
  PenLine,
  Phone,
  Send,
  Sparkles,
} from "lucide-react"
import { Suspense, useEffect, useMemo, useRef, useState } from "react"
import * as THREE from "three"

import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const benefits = [
  "Thiệp cưới 3D tương tác trên mọi thiết bị",
  "Câu chuyện tình yêu được trình bày tinh tế",
  "Biểu mẫu xác nhận tham dự, bản đồ và thông tin tiệc rõ ràng",
  "Thiết kế cá nhân hóa theo màu sắc lễ cưới",
]

const process = [
  {
    title: "Lắng nghe",
    text: "Chúng tôi ghi lại phong cách, tông màu, địa điểm và những chi tiết riêng của hai bạn.",
  },
  {
    title: "Thiết kế",
    text: "Bản phối 3D, bố cục nội dung và chuyển động được dựng thành trải nghiệm có thể duyệt thử.",
  },
  {
    title: "Hoàn thiện",
    text: "Tinh chỉnh hiệu ứng, tối ưu di động, gắn xác nhận tham dự và bàn giao liên kết mời khách.",
  },
]

const gallery = [
  "Vườn Hồng",
  "Sảnh Champagne",
  "Nhà Nguyện Ngọc Trai",
  "Dạ Tiệc Hồng Phấn",
]

const pricing = [
  {
    name: "Dấu Ấn",
    price: "8.900.000đ",
    features: ["Thiệp 3D mở gập", "6 phần nội dung", "Biểu mẫu liên hệ"],
  },
  {
    name: "Xưởng May Đo",
    price: "14.900.000đ",
    features: [
      "Thiết kế riêng",
      "Xác nhận tham dự nâng cao",
      "Thư viện ảnh cưới",
    ],
  },
  {
    name: "Độc Bản",
    price: "Liên hệ",
    features: ["Ý tưởng độc quyền", "3D chi tiết", "Hỗ trợ ngày cưới"],
  },
]

function useHeroProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const trigger = ScrollTrigger.create({
      trigger: "#hero",
      start: "top top",
      end: "bottom bottom",
      scrub: 0.7,
      invalidateOnRefresh: true,
      onUpdate: (self) => setProgress(self.progress),
    })

    return () => trigger.kill()
  }, [])

  return progress
}

function createPaperTexture() {
  const canvas = document.createElement("canvas")
  canvas.width = 256
  canvas.height = 256
  const ctx = canvas.getContext("2d")

  if (!ctx) {
    return null
  }

  ctx.fillStyle = "#fff8ef"
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  for (let i = 0; i < 4000; i += 1) {
    const alpha = Math.random() * 0.08
    ctx.fillStyle =
      Math.random() > 0.48
        ? `rgba(139, 95, 72, ${alpha})`
        : `rgba(255, 255, 255, ${alpha})`
    ctx.fillRect(
      Math.random() * canvas.width,
      Math.random() * canvas.height,
      Math.random() * 2.2,
      Math.random() * 2.2
    )
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  texture.repeat.set(2.4, 2.8)
  texture.colorSpace = THREE.SRGBColorSpace
  return texture
}

function PaperMaterial({ tone = "#fff8ef" }: { tone?: string }) {
  const texture = useMemo(() => createPaperTexture(), [])

  return (
    <meshPhysicalMaterial
      color={tone}
      map={texture ?? undefined}
      roughness={0.82}
      metalness={0}
      clearcoat={0.08}
      clearcoatRoughness={0.9}
    />
  )
}

function GoldLine({
  position,
  scale,
  rotation,
}: {
  position: [number, number, number]
  scale: [number, number, number]
  rotation?: [number, number, number]
}) {
  return (
    <mesh position={position} rotation={rotation} castShadow receiveShadow>
      <boxGeometry args={scale} />
      <meshStandardMaterial color="#d7aa53" metalness={0.72} roughness={0.28} />
    </mesh>
  )
}

function FlowerCluster({
  position,
  rotation = [0, 0, 0],
  scale = 1,
}: {
  position: [number, number, number]
  rotation?: [number, number, number]
  scale?: number
}) {
  const petalPositions = [
    [0, 0.11, 0],
    [0.11, 0, 0],
    [0, -0.11, 0],
    [-0.11, 0, 0],
    [0.08, 0.08, 0],
  ] as const

  return (
    <group position={position} rotation={rotation} scale={scale}>
      {petalPositions.map((petal, index) => (
        <mesh
          key={`${petal[0]}-${petal[1]}-${index}`}
          position={petal}
          rotation={[0, 0, (index * Math.PI) / 5]}
          castShadow
        >
          <sphereGeometry args={[0.09, 18, 12]} />
          <meshStandardMaterial
            color={index === 4 ? "#f5c0c8" : "#f7d6dc"}
            roughness={0.55}
          />
        </mesh>
      ))}
      <mesh position={[0, 0, 0.03]} castShadow>
        <sphereGeometry args={[0.045, 16, 12]} />
        <meshStandardMaterial
          color="#d7aa53"
          metalness={0.3}
          roughness={0.32}
        />
      </mesh>
      <GoldLine
        position={[0.22, -0.14, -0.01]}
        rotation={[0, 0, -0.7]}
        scale={[0.34, 0.018, 0.018]}
      />
      <GoldLine
        position={[0.27, -0.24, -0.01]}
        rotation={[0, 0, 0.25]}
        scale={[0.22, 0.014, 0.014]}
      />
    </group>
  )
}

function InvitationText() {
  return (
    <group position={[0, 0, 0.065]}>
      <Text
        position={[0.14, 1.2, 0]}
        fontSize={0.14}
        letterSpacing={0}
        color="#9f7a38"
        anchorX="center"
        anchorY="middle"
      >
        Trân trọng kính mời
      </Text>
      <Text
        position={[0, 0.76, 0]}
        fontSize={0.2}
        letterSpacing={0}
        color="#50342f"
        maxWidth={2.35}
        textAlign="center"
        anchorX="center"
        anchorY="middle"
      >
        Ngọc Anh & Viết Đức
      </Text>
      <Text
        position={[0, 0.31, 0]}
        fontSize={0.15}
        letterSpacing={0}
        color="#7d625a"
        maxWidth={2.15}
        textAlign="center"
        anchorX="center"
        anchorY="middle"
      >
        tới dự lễ thành hôn và cùng chia sẻ khoảnh khắc hạnh phúc của chúng tôi
      </Text>
      <Text
        position={[0, -0.3, 0]}
        fontSize={0.21}
        letterSpacing={0}
        color="#9f7a38"
        anchorX="center"
        anchorY="middle"
      >
        24 tháng 8, 2026
      </Text>
      <Text
        position={[0, -0.7, 0]}
        fontSize={0.14}
        letterSpacing={0}
        color="#65514b"
        maxWidth={2.2}
        textAlign="center"
        anchorX="center"
        anchorY="middle"
      >
        The Reverie Saigon, 22 Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh
      </Text>
      <Text
        position={[0, -1.34, 0]}
        fontSize={0.13}
        letterSpacing={0}
        color="#7a5d55"
        maxWidth={2.15}
        textAlign="center"
        anchorX="center"
        anchorY="middle"
      >
        Tiệc tối, âm nhạc và ly champagne mừng hạnh phúc đang chờ bạn.
      </Text>
    </group>
  )
}

function WeddingCard({ progress }: { progress: number }) {
  const groupRef = useRef<THREE.Group>(null)
  const coverRef = useRef<THREE.Group>(null)
  const { viewport } = useThree()
  const isMobile = viewport.width < 6
  const scale = isMobile ? 0.54 : 0.9
  const baseX = isMobile ? 0 : 1.08
  const baseY = isMobile ? -0.92 : 0.08

  useFrame((state, delta) => {
    if (!groupRef.current || !coverRef.current) return

    const eased = gsap.parseEase("power2.inOut")(progress)
    coverRef.current.rotation.y = THREE.MathUtils.damp(
      coverRef.current.rotation.y,
      -2.48 * eased,
      4.5,
      delta
    )

    const targetX = state.pointer.y * 0.12 - progress * 0.08
    const targetY = state.pointer.x * 0.16 + progress * 0.22
    groupRef.current.rotation.x = THREE.MathUtils.damp(
      groupRef.current.rotation.x,
      targetX,
      3.5,
      delta
    )
    groupRef.current.rotation.y = THREE.MathUtils.damp(
      groupRef.current.rotation.y,
      targetY,
      3.5,
      delta
    )
    groupRef.current.position.x = THREE.MathUtils.damp(
      groupRef.current.position.x,
      baseX,
      2.2,
      delta
    )
    groupRef.current.position.y = THREE.MathUtils.damp(
      groupRef.current.position.y,
      baseY - progress * 0.14,
      2,
      delta
    )

    state.camera.position.x = THREE.MathUtils.damp(
      state.camera.position.x,
      progress * 0.45,
      2.2,
      delta
    )
    state.camera.position.y = THREE.MathUtils.damp(
      state.camera.position.y,
      0.35 + progress * 0.22,
      2.2,
      delta
    )
    state.camera.position.z = THREE.MathUtils.damp(
      state.camera.position.z,
      6.8 - progress * 1.15,
      2.2,
      delta
    )
    state.camera.lookAt(0, 0.05, 0)
  })

  return (
    <Float speed={1.3} rotationIntensity={0.05} floatIntensity={0.12}>
      <group ref={groupRef} scale={scale} position={[baseX, baseY, 0]}>
        <group position={[0, 0, -0.01]} castShadow receiveShadow>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[3.2, 4.24, 0.06, 24, 24, 1]} />
            <PaperMaterial />
          </mesh>
          <GoldLine position={[0, 1.88, 0.045]} scale={[2.74, 0.028, 0.028]} />
          <GoldLine position={[0, -1.88, 0.045]} scale={[2.74, 0.028, 0.028]} />
          <GoldLine position={[-1.33, 0, 0.045]} scale={[0.028, 3.55, 0.028]} />
          <GoldLine position={[1.33, 0, 0.045]} scale={[0.028, 3.55, 0.028]} />
          <GoldLine position={[0, 1.1, 0.05]} scale={[1.18, 0.018, 0.018]} />
          <GoldLine position={[0, -1.04, 0.05]} scale={[1.18, 0.018, 0.018]} />
          <FlowerCluster
            position={[-1.13, 1.46, 0.1]}
            rotation={[0, 0, -0.35]}
            scale={1.04}
          />
          <FlowerCluster
            position={[1.16, -1.44, 0.1]}
            rotation={[0, 0, 2.7]}
            scale={0.9}
          />
          <Suspense fallback={null}>
            <InvitationText />
          </Suspense>
        </group>

        <group ref={coverRef} position={[-1.6, 0, 0.055]}>
          <group position={[1.6, 0, 0]}>
            <mesh castShadow receiveShadow>
              <boxGeometry args={[3.2, 4.24, 0.07, 24, 24, 1]} />
              <PaperMaterial tone="#fff4e7" />
            </mesh>
            <GoldLine
              position={[0, 1.88, 0.055]}
              scale={[2.72, 0.032, 0.032]}
            />
            <GoldLine
              position={[0, -1.88, 0.055]}
              scale={[2.72, 0.032, 0.032]}
            />
            <GoldLine
              position={[-1.33, 0, 0.055]}
              scale={[0.032, 3.55, 0.032]}
            />
            <GoldLine
              position={[1.33, 0, 0.055]}
              scale={[0.032, 3.55, 0.032]}
            />
            <Suspense fallback={null}>
              <Text
                position={[0, 0.28, 0.085]}
                fontSize={0.46}
                letterSpacing={0}
                color="#8d6730"
                anchorX="center"
                anchorY="middle"
              >
                N & Đ
              </Text>
              <Text
                position={[0, -0.28, 0.086]}
                fontSize={0.15}
                letterSpacing={0}
                color="#7a5a50"
                anchorX="center"
                anchorY="middle"
              >
                Thiệp cưới
              </Text>
            </Suspense>
            <FlowerCluster
              position={[-1.04, 1.36, 0.105]}
              rotation={[0, 0, -0.38]}
              scale={1}
            />
            <FlowerCluster
              position={[1.08, -1.39, 0.105]}
              rotation={[0, 0, 2.65]}
              scale={0.9}
            />
          </group>
        </group>

        <mesh position={[-1.61, 0, 0.045]} castShadow>
          <cylinderGeometry args={[0.035, 0.035, 4.26, 24]} />
          <meshStandardMaterial
            color="#d8ad59"
            metalness={0.64}
            roughness={0.28}
          />
        </mesh>
      </group>
    </Float>
  )
}

function HeroScene({ progress }: { progress: number }) {
  return (
    <Canvas
      shadows
      dpr={[1, 1.8]}
      camera={{ position: [0, 0.35, 6.8], fov: 38 }}
      gl={{ antialias: true, alpha: true }}
      className="h-full w-full"
    >
      <color attach="background" args={["#f9f1e6"]} />
      <fog attach="fog" args={["#f9f1e6", 7, 12]} />
      <ambientLight intensity={1.25} />
      <directionalLight
        position={[-4, 5, 5]}
        intensity={2.4}
        castShadow
        shadow-mapSize={[2048, 2048]}
      />
      <spotLight
        position={[3.8, 4.2, 4.5]}
        angle={0.45}
        penumbra={0.8}
        intensity={3.2}
        color="#ffdca0"
        castShadow
      />
      <pointLight position={[-2.8, 1.8, 3.8]} intensity={1.4} color="#ffd7db" />
      <WeddingCard progress={progress} />
      <mesh
        position={[0, -2.42, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <circleGeometry args={[4.7, 80]} />
        <meshStandardMaterial color="#f3e5d4" roughness={0.9} />
      </mesh>
      <ContactShadows
        position={[0, -2.38, 0]}
        opacity={0.35}
        scale={6.5}
        blur={2.6}
        far={3.2}
        color="#9a6f58"
      />
      <Environment preset="apartment" />
    </Canvas>
  )
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="border-l border-[#d6aa57]/55 pl-4">
      <div className="text-2xl font-semibold text-[#43322c]">{value}</div>
      <div className="mt-1 text-sm text-[#806b61]">{label}</div>
    </div>
  )
}

function SectionHeading({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string
  title: string
  text: string
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <div className="mb-3 inline-flex items-center gap-2 text-xs font-semibold text-[#a77a35] uppercase">
        <Sparkles className="size-4" aria-hidden="true" />
        {eyebrow}
      </div>
      <h2 className="font-serif text-3xl leading-tight font-semibold text-[#352824] sm:text-4xl">
        {title}
      </h2>
      <p className="mt-4 text-base leading-8 text-[#75635b]">{text}</p>
    </div>
  )
}

export default function Page() {
  const progress = useHeroProgress()

  return (
    <main className="min-h-svh overflow-x-clip bg-[#fbf6ef] text-[#312622]">
      <section id="hero" className="relative h-[190svh]">
        <div className="sticky top-0 h-svh overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(245,192,200,0.38),transparent_28%),radial-gradient(circle_at_82%_78%,rgba(214,170,87,0.24),transparent_30%)]" />
          <HeroScene progress={progress} />

          <div className="pointer-events-none absolute inset-0 flex items-start px-5 pt-8 sm:px-8 lg:items-center lg:px-14 lg:pt-0">
            <div className="max-w-md lg:max-w-lg">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#d6aa57]/40 bg-white/55 px-3 py-1 text-xs font-semibold text-[#8d6730] uppercase backdrop-blur">
                <Gem className="size-3.5" aria-hidden="true" />
                Xưởng thiết kế thiệp cưới 3D cao cấp
              </div>
              <h1 className="font-serif text-3xl leading-[1.06] font-semibold text-[#312622] sm:text-6xl lg:text-6xl">
                Một tấm thiệp cưới khách mời có thể cảm nhận.
              </h1>
              <p className="mt-4 max-w-lg text-sm leading-7 text-[#715f56] sm:mt-5 sm:text-lg sm:leading-8">
                awedding tạo thiệp cưới trực tuyến giàu cảm xúc với mô hình
                thiệp 3D mở gập thật, chất liệu giấy mềm, hoa trang trí tinh tế
                và chuyển động cuộn trang duyên dáng.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href="#contact"
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "pointer-events-auto h-11 rounded-full bg-[#2f5951] px-5 text-white hover:bg-[#254940]"
                  )}
                >
                  <Mail className="size-4" aria-hidden="true" />
                  Đặt lịch tư vấn
                </a>
                <a
                  href="#pricing"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "pointer-events-auto h-11 rounded-full border-[#d6aa57]/45 bg-white/55 px-5 text-[#765238] backdrop-blur hover:bg-white/80"
                  )}
                >
                  Xem bảng giá
                  <ChevronRight className="size-4" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>

          <div className="absolute right-5 bottom-6 hidden rounded-full border border-[#d6aa57]/35 bg-white/55 px-4 py-2 text-xs font-medium text-[#80613a] backdrop-blur md:block">
            Cuộn để mở thiệp
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 lg:px-14">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 text-xs font-semibold text-[#a77a35] uppercase">
              <CalendarHeart className="size-4" aria-hidden="true" />
              Giới thiệu dịch vụ
            </div>
            <h2 className="max-w-2xl font-serif text-3xl leading-tight font-semibold text-[#352824] sm:text-4xl">
              Thiệp cưới số cao cấp, được thiết kế như một kỷ vật.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-[#75635b]">
              Chúng tôi kết hợp mô hình 3D, bố cục tinh tế và thông tin sự kiện
              rõ ràng để khách mời không chỉ nhận một liên kết, mà nhận được cảm
              giác đầu tiên về không gian ngày cưới của bạn.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4 rounded-lg border border-[#e7d2ad] bg-white/55 p-5 shadow-[0_20px_60px_rgba(122,82,54,0.08)] backdrop-blur">
            <Stat value="3D" label="thiệp mở gập" />
            <Stat value="48h" label="bản xem trước" />
            <Stat value="100%" label="tối ưu di động" />
          </div>
        </div>
      </section>

      <section className="bg-[#f6ecdf] px-5 py-20 sm:px-8 lg:px-14">
        <SectionHeading
          eyebrow="Lợi ích"
          title="Mọi chi tiết đều chỉn chu trước khi ngày cưới bắt đầu."
          text="Từ ánh sáng ấm áp đến luồng xác nhận tham dự mượt mà, trải nghiệm được làm lãng mạn nhưng vẫn nhẹ nhàng và dễ sử dụng."
        />
        <div className="mx-auto mt-12 grid max-w-6xl gap-4 md:grid-cols-2">
          {benefits.map((item) => (
            <div
              key={item}
              className="flex items-start gap-4 rounded-lg border border-[#e2cfae] bg-[#fffaf3] p-5"
            >
              <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-[#2f5951] text-white">
                <Check className="size-4" aria-hidden="true" />
              </span>
              <p className="text-base leading-7 font-medium text-[#51413b]">
                {item}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 lg:px-14">
        <SectionHeading
          eyebrow="Quy trình"
          title="Một lộ trình nhẹ nhàng từ ý tưởng đến liên kết thiệp mời."
          text="Quy trình được sắp xếp rõ ràng, cùng trao đổi chặt chẽ và tập trung vào trải nghiệm thuận tiện cho từng khách mời."
        />
        <div className="mx-auto mt-12 grid max-w-6xl gap-5 md:grid-cols-3">
          {process.map((step, index) => (
            <div
              key={step.title}
              className="rounded-lg border border-[#e7d2ad] bg-white/60 p-6 shadow-[0_18px_45px_rgba(122,82,54,0.07)]"
            >
              <div className="mb-8 flex size-11 items-center justify-center rounded-full bg-[#f5c0c8] text-sm font-semibold text-[#6f3d45]">
                {index + 1}
              </div>
              <h3 className="font-serif text-2xl font-semibold text-[#352824]">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-[#75635b]">
                {step.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#fffaf3] px-5 py-20 sm:px-8 lg:px-14">
        <SectionHeading
          eyebrow="Bộ sưu tập"
          title="Những hướng thẩm mỹ lãng mạn cho từng phong cách tiệc cưới."
          text="Chọn một tinh thần hình ảnh, sau đó chúng tôi tinh chỉnh thiệp, hoa, chữ và nhịp nội dung theo ngày vui của bạn."
        />
        <div className="mx-auto mt-12 grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {gallery.map((item, index) => (
            <div
              key={item}
              className="group relative aspect-[4/5] overflow-hidden rounded-lg border border-[#e6cfaa] bg-[#f6ecdf]"
            >
              <div
                className={cn(
                  "absolute inset-0",
                  index === 0 &&
                    "bg-[radial-gradient(circle_at_34%_28%,#f6c4cc_0_11%,transparent_12%),linear-gradient(145deg,#fff6ec,#eed5c9_48%,#d6aa57)]",
                  index === 1 &&
                    "bg-[radial-gradient(circle_at_70%_25%,#ffe5ad_0_10%,transparent_11%),linear-gradient(145deg,#fffaf3,#e5ccb0_52%,#b8873e)]",
                  index === 2 &&
                    "bg-[radial-gradient(circle_at_40%_36%,#ffffff_0_12%,transparent_13%),linear-gradient(145deg,#fffdf8,#eaded4_54%,#c7a46b)]",
                  index === 3 &&
                    "bg-[radial-gradient(circle_at_55%_22%,#f5c0c8_0_13%,transparent_14%),linear-gradient(145deg,#fff5f0,#ebc8d0_50%,#d6aa57)]"
                )}
              />
              <div className="absolute inset-x-5 bottom-5 border-t border-white/70 pt-4">
                <p className="font-serif text-xl font-semibold text-[#352824]">
                  {item}
                </p>
                <p className="mt-1 text-sm text-[#6d5a52]">Ý tưởng thiệp mời</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="pricing" className="px-5 py-20 sm:px-8 lg:px-14">
        <SectionHeading
          eyebrow="Bảng giá"
          title="Gói dịch vụ cho tiệc thân mật đến cuối tuần cưới trọn vẹn."
          text="Mỗi gói bao gồm định hướng mỹ thuật, triển khai responsive và hỗ trợ ra mắt thiệp."
        />
        <div className="mx-auto mt-12 grid max-w-6xl gap-5 lg:grid-cols-3">
          {pricing.map((plan) => (
            <div
              key={plan.name}
              className="rounded-lg border border-[#e0c595] bg-white/65 p-6 shadow-[0_18px_45px_rgba(122,82,54,0.07)]"
            >
              <div className="flex items-center justify-between gap-4">
                <h3 className="font-serif text-2xl font-semibold text-[#352824]">
                  {plan.name}
                </h3>
                <Gem className="size-5 text-[#b78a3c]" aria-hidden="true" />
              </div>
              <p className="mt-5 font-serif text-3xl font-semibold text-[#2f5951]">
                {plan.price}
              </p>
              <div className="mt-6 space-y-3">
                {plan.features.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-3 text-sm text-[#68554e]"
                  >
                    <Check
                      className="size-4 text-[#b78a3c]"
                      aria-hidden="true"
                    />
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section
        id="contact"
        className="bg-[#f6ecdf] px-5 py-20 sm:px-8 lg:px-14"
      >
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 text-xs font-semibold text-[#a77a35] uppercase">
              <HeartHandshake className="size-4" aria-hidden="true" />
              Liên hệ
            </div>
            <h2 className="font-serif text-3xl leading-tight font-semibold text-[#352824] sm:text-4xl">
              Cùng thiết kế khoảnh khắc đẹp đầu tiên mà khách mời nhận được.
            </h2>
            <div className="mt-8 space-y-4 text-sm text-[#6d5a52]">
              <p className="flex items-center gap-3">
                <Mail className="size-4 text-[#a77a35]" aria-hidden="true" />
                hello@awedding.vn
              </p>
              <p className="flex items-center gap-3">
                <Phone className="size-4 text-[#a77a35]" aria-hidden="true" />
                +84 90 000 2026
              </p>
              <p className="flex items-center gap-3">
                <MapPin className="size-4 text-[#a77a35]" aria-hidden="true" />
                Thành phố Hồ Chí Minh, Việt Nam
              </p>
            </div>
          </div>
          <form className="grid gap-4 rounded-lg border border-[#e0c595] bg-[#fffaf3] p-5 shadow-[0_20px_60px_rgba(122,82,54,0.08)] sm:grid-cols-2">
            <label className="grid gap-2 text-sm font-medium text-[#58463f]">
              Tên của bạn
              <input className="h-11 rounded-md border border-[#dec8a7] bg-white px-3 text-sm transition outline-none focus:border-[#b78a3c]" />
            </label>
            <label className="grid gap-2 text-sm font-medium text-[#58463f]">
              Địa chỉ email
              <input
                type="email"
                className="h-11 rounded-md border border-[#dec8a7] bg-white px-3 text-sm transition outline-none focus:border-[#b78a3c]"
              />
            </label>
            <label className="grid gap-2 text-sm font-medium text-[#58463f]">
              Ngày cưới
              <input
                type="date"
                className="h-11 rounded-md border border-[#dec8a7] bg-white px-3 text-sm transition outline-none focus:border-[#b78a3c]"
              />
            </label>
            <label className="grid gap-2 text-sm font-medium text-[#58463f]">
              Gói quan tâm
              <select className="h-11 rounded-md border border-[#dec8a7] bg-white px-3 text-sm transition outline-none focus:border-[#b78a3c]">
                <option>Dấu Ấn</option>
                <option>Xưởng May Đo</option>
                <option>Độc Bản</option>
              </select>
            </label>
            <label className="grid gap-2 text-sm font-medium text-[#58463f] sm:col-span-2">
              Ghi chú
              <textarea className="min-h-32 rounded-md border border-[#dec8a7] bg-white px-3 py-3 text-sm transition outline-none focus:border-[#b78a3c]" />
            </label>
            <button
              type="button"
              className={cn(
                buttonVariants({ size: "lg" }),
                "h-11 rounded-full bg-[#2f5951] px-5 text-white hover:bg-[#254940] sm:col-span-2 sm:w-fit"
              )}
            >
              <Send className="size-4" aria-hidden="true" />
              Gửi yêu cầu tư vấn
            </button>
          </form>
        </div>
      </section>

      <footer className="border-t border-[#e4cfad] bg-[#fffaf3] px-5 py-8 text-sm text-[#806b61] sm:px-8 lg:px-14">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="font-semibold text-[#352824]">awedding</div>
          <div className="flex items-center gap-2">
            <PenLine className="size-4 text-[#a77a35]" aria-hidden="true" />
            Thiệp cưới 3D cao cấp
          </div>
        </div>
      </footer>
    </main>
  )
}
