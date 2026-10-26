// =====================================================================
// Aravind Shankar — ECE Student Portfolio Content
// NOTE: ECE data. All content is structured here and easy to replace.
// No components hardcode copy.
// =====================================================================

export interface ProjectItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  shortDesc: string;
  specs: {
    mcuOrChip: string;
    sensorsOrRadio: string;
    protocol: string;
    tools: string;
  };
  buildStory: string;
  tags: string[];
  githubUrl: string;
  schematicUrl: string;
  artType: 'energy-meter' | 'fm-receiver' | 'fpga-alu' | 'pid-robot' | 'ecg-front-end' | 'lora-node';
}

export interface ExperiencePanel {
  id: string;
  category: 'LEARNING' | 'INTERNSHIPS' | 'CLUB';
  tag: string;
  year: string;
  bgWord: string;
  title: string;
  subtitle: string;
  description: string;
  columns: {
    hardware: string;
    firmware: string;
    verification: string;
  };
}

export interface ServiceItem {
  index: string;
  title: string;
  description: string;
  tags: string[];
  deliverable: string;
  artType: 'pcb' | 'firmware' | 'fpga' | 'analog' | 'iot';
}

export const portfolioContent = {
  meta: {
    name: "ARAVIND SHANKAR",
    initials: "AS",
    tagline: "ELECTRONICS & COMMUNICATION ENGINEERING",
    roleLabel: "ECE STUDENT, EST. 2026",
    degree: "B.Tech in Electronics & Communication Engineering",
    university: "Premier Institute of Technology, Bengaluru (Class of 2026)",
    academics: "CGPA: 9.42 / 10.0 • Department Rank #2",
    location: "Bengaluru, India",
    timeZone: "Asia/Kolkata",
    statusText: "AVAILABLE FOR HARDWARE & EMBEDDED INTERNSHIPS",
  },

  nav: {
    links: [
      { label: "HOME", href: "#hero" },
      { label: "ABOUT", href: "#about" },
      { label: "EXPERIENCE", href: "#experience" },
      { label: "BUILDS", href: "#builds" },
      { label: "WORKS", href: "#works" },
      { label: "SKILLS", href: "#services" },
      { label: "CONTACT", href: "#contact" },
    ],
    socials: [
      { name: "GitHub", href: "https://github.com/aravindshankar", icon: "github" },
      { name: "LinkedIn", href: "https://linkedin.com/in/aravindshankar", icon: "linkedin" },
      { name: "Instagram", href: "https://instagram.com/aravindshankar", icon: "instagram" },
      { name: "Mail", href: "mailto:aravindshankar.ece@gmail.com", icon: "mail" },
    ],
  },

  hero: {
    departmentTag: "DEPARTMENT OF ELECTRONICS & COMMUNICATION ENGINEERING",
    headlineLine1: "ELECTRONICS",
    headlineLine2: "ENGINEERING",
    badgeLabel: "ECE UNDERGRADUATE, EST. 2026",
    bioSnippet: "I AM PASSIONATE ABOUT BUILDING RELIABLE HARDWARE, FROM DISCRETE ANALOG SCHEMATICS TO HIGH-SPEED 4-LAYER PCBS AND DETERMINISTIC BARE-METAL C FIRMWARE.",
    tags: ["EMBEDDED SYSTEMS", "PCB DESIGN", "VLSI / FPGA", "RF TELEMETRY"],
    scrollHint: "SCROLL TO INITIALIZE INSTRUMENTATION",
  },

  about: {
    headlinePart1: "ABOUT",
    headlinePart2: "ME",
    badge: "SYSTEM ARCHITECTURE & PROFILE",
    bioParagraphs: [
      "Bridging electromagnetic wave physics and deterministic digital logic through silicon, copper, and bare-metal firmware. As an Electronics & Communication Engineering (ECE) undergraduate, I design embedded systems with an obsession for clean ground return paths, controlled impedance matching, and microsecond timing predictability.",
      "From routing 4-layer mixed-signal boards in KiCad to synthesising synchronous RTL pipelines on Xilinx Artix-7 FPGAs, my lab bench is where Maxwell's differential equations translate into physical, verified hardware prototypes.",
      "Every trace has parasitic inductance, every CMOS gate has propagation delay, and every sensor has flicker noise. Real engineering is the art of mastering those physical constraints."
    ],
    facts: [
      {
        label: "EDUCATION & CGPA",
        value: "B.Tech Electronics & Communication Engineering (Class of 2026) • CGPA: 9.42 / 10.0",
      },
      {
        label: "CORE COMPETENCIES",
        value: "High-Speed PCB Design, ARM Cortex Bare-Metal C, Verilog HDL, Analog Front-Ends",
      },
      {
        label: "BENCH INSTRUMENTATION",
        value: "Rigol 100MHz 4-Ch DSO, Saleae 16-Ch Logic Analyzer, Nordic PPK2, NanoVNA",
      },
    ],
  },

  experience: {
    chapterTag: "CH.03 — CAREER TRAJECTORY",
    headline: "WHERE I'VE BEEN",
    subtitle: "My technical development across circuits, firmware, and validation.",
    filterTabs: ["ALL", "LEARNING", "INTERNSHIPS", "CLUB"],
    panels: [
      {
        id: "exp-1",
        category: "LEARNING",
        tag: "ORIGIN & FOUNDATIONS",
        year: "2023 — 2024",
        bgWord: "EMBEDDED",
        title: "CORE HARDWARE & BARE-METAL C",
        subtitle: "Foundations in discrete circuits, Ohm & Kirchhoff laws, and AVR registers.",
        description: "Dissected transistor amplifier stages, operational amplifier topology, and bare-metal AVR microcontrollers. Mastered hardware timers, interrupt vectors, and low-level memory layout.",
        columns: {
          hardware: "Discrete analog circuits, RLC networks, op-amp active filters",
          firmware: "Bare-metal C, bit manipulation, UART/SPI peripheral drivers",
          verification: "Rigol 100MHz 2-channel oscilloscope, bench DMM, signal generator",
        },
      },
      {
        id: "exp-2",
        category: "CLUB",
        tag: "HARDWARE CLUB & BOARDS",
        year: "2024 — 2025",
        bgWord: "PCB",
        title: "STM32 ARCHITECTURE & PCB FABRICATION",
        subtitle: "Designing custom development boards and deterministic DMA pipelines.",
        description: "Designed 2-layer and 4-layer mixed-signal boards in KiCad. Implemented DMA-driven peripheral buses, USB CDC stacks, and hardware impedance matching for custom development boards.",
        columns: {
          hardware: "KiCad 8, 4-layer stackups, controlled impedance, JLCPCB SMT",
          firmware: "STM32CubeIDE, HAL & LL drivers, DMA circular ring-buffers",
          verification: "Logic analyzers, differential probe analysis, ripple & jitter measurement",
        },
      },
      {
        id: "exp-3",
        category: "INTERNSHIPS",
        tag: "INDUSTRY EXPERIENCE",
        year: "SUMMER 2025",
        bgWord: "VLSI",
        title: "HARDWARE VALIDATION INTERN",
        subtitle: "Automated regression testing and EMC pre-compliance verification.",
        description: "Conducted automated boundary testing and signal validation for industrial edge sensor modules. Wrote Python test harnesses and automated SPI/I2C packet capture suites.",
        columns: {
          hardware: "Industrial sensor test jigs, EMC pre-compliance shielding fixtures",
          firmware: "Custom automated bootloader flashers, pySerial test automation",
          verification: "Automated test suites, thermal chamber environmental logging",
        },
      },
      {
        id: "exp-4",
        category: "CLUB",
        tag: "CURRENT CAPSTONE",
        year: "2025 — 2026",
        bgWord: "IoT",
        title: "SUB-GHZ TELEMETRY & DISTRIBUTED NODES",
        subtitle: "Ultra-low-power radio mesh nodes with energy-harvesting front-ends.",
        description: "Architecting a solar-harvested low-power mesh network using SX1278 LoRa transceivers and ESP32 sleep modes. Deep sleep power optimization down to 14.8 microamperes.",
        columns: {
          hardware: "Solar MPPT charging circuits, sub-1µA quiescent low-dropout regulators",
          firmware: "FreeRTOS preemptive scheduler, MQTT-SN packet compression framing",
          verification: "Nordic Power Profiler Kit II, RF spectrum analyzer, 4.2km range tests",
        },
      },
    ] as ExperiencePanel[],
  },

  builds: {
    sectionTag: "CH.04 — HARDWARE BUILDS",
    label: "HARDWARE BUILDS",
    subtitle: "Perspective-warped showcase of physical fabrication & telemetry units.",
    hint: "DRAG HORIZONTALLY, USE ARROW KEYS OR WHEEL TO CYCLE",
  },

  works: {
    sectionTag: "CH.05 — SELECTED WORKS",
    drumCenterText: "WORKS '26",
    drumHint: "SCROLL OR DRAG DRUM TO CYCLE",
    projects: [
      {
        id: "energy-meter",
        number: "01",
        title: "SMART ENERGY METER",
        subtitle: "ESP32 Non-Invasive AC Current & Power Telemetry",
        shortDesc: "High-speed AC sampling with true-RMS computation, active/reactive power metrics, and secure cloud telemetry.",
        specs: {
          mcuOrChip: "ESP32-WROOM-32D Dual-Core 240MHz",
          sensorsOrRadio: "ACS712-20A Hall + ZMPT101B Voltage Transformer",
          protocol: "MQTT over TLS 1.3 / Wi-Fi 802.11 b/g/n",
          tools: "KiCad 8, FreeRTOS, ESP-IDF, InfluxDB",
        },
        buildStory: "Engineered a calibrated multi-phase power telemetry unit capable of sampling instantaneous voltage and current waveforms at 4 kHz. Implemented dual-core task segregation: core 0 handles FreeRTOS networking and cryptographic TLS handshakes, while core 1 executes zero-crossing interrupt routines and numerical true-RMS integration.",
        tags: ["ESP32", "POWER ELECTRONICS", "MQTT", "KICAD"],
        githubUrl: "https://github.com/aravindshankar/smart-energy-meter",
        schematicUrl: "https://github.com/aravindshankar/smart-energy-meter/tree/main/hardware",
        artType: "energy-meter",
      },
      {
        id: "fm-receiver",
        number: "02",
        title: "FM RECEIVER BOARD",
        subtitle: "Synthesized TEA5767 Tuner with Integrated Amplifier",
        shortDesc: "Low-noise broadcast stereo tuner board with dedicated LC antenna matching and TDA2822M audio stage.",
        specs: {
          mcuOrChip: "Philips TEA5767 + TDA2822M + ATmega328P",
          sensorsOrRadio: "76–108 MHz RF Front-End with Telescopic LC network",
          protocol: "I2C Bus @ 100 kHz with digital PLL tuning",
          tools: "KiCad 8, RF Ground Pour, Spectrum Analyser",
        },
        buildStory: "Designed an isolated RF PCB with distinct analog, digital, and RF ground islands connected through a single star point. The tuner incorporates an active software AGC (Automatic Gain Control) algorithm and an OLED tuning interface with real-time RSSI signal quality metering.",
        tags: ["RF CIRCUITS", "ANALOG", "I2C", "PCB DESIGN"],
        githubUrl: "https://github.com/aravindshankar/fm-receiver-board",
        schematicUrl: "https://github.com/aravindshankar/fm-receiver-board/tree/main/schematics",
        artType: "fm-receiver",
      },
      {
        id: "fpga-alu",
        number: "03",
        title: "8-BIT ALU ON FPGA",
        subtitle: "Pipelined Arithmetic Logic Unit in Verilog HDL",
        shortDesc: "Synchronous 16-operation computing block with carry-lookahead addition and zero/overflow detection flags.",
        specs: {
          mcuOrChip: "Xilinx Artix-7 FPGA (Digilent Basys 3)",
          sensorsOrRadio: "16-Bit Switch Bus & 7-Segment Multiplexed Display",
          protocol: "Synchronous 100 MHz System Clock Pipeline",
          tools: "Vivado ML Edition, ModelSim, Verilog HDL (IEEE 1364)",
        },
        buildStory: "Architected an 8-bit modular Arithmetic Logic Unit featuring carry-lookahead adders to minimise propagation delay across arithmetic stages. Wrote self-checking verification testbenches verifying 100,000 randomised vector pairs with complete state coverage prior to bitstream synthesis.",
        tags: ["VERILOG", "FPGA", "VIVADO", "DIGITAL LOGIC"],
        githubUrl: "https://github.com/aravindshankar/fpga-8bit-alu",
        schematicUrl: "https://github.com/aravindshankar/fpga-8bit-alu/tree/main/rtl",
        artType: "fpga-alu",
      },
      {
        id: "pid-robot",
        number: "04",
        title: "PID LINE-FOLLOWER ROBOT",
        subtitle: "High-Speed Autonomous STM32 Surface Vehicle",
        shortDesc: "Closed-loop 500 Hz PID tracking vehicle with differential PWM motor control and analog optical array.",
        specs: {
          mcuOrChip: "STM32F401RE ARM Cortex-M4 @ 84MHz",
          sensorsOrRadio: "8-Channel QTR-8A Infrared Reflectance Array",
          protocol: "Hardware Timer PWM @ 20 kHz + TB6612FNG Dual Driver",
          tools: "STM32CubeIDE, MATLAB Simulink, PID Tuning Tool",
        },
        buildStory: "Implemented a floating-point PID controller running in a deterministic hardware timer ISR at 500 Hz. Calibrated line curvature dynamics in MATLAB to eliminate phase lag and overshoot, enabling stable traversal across sharp 90-degree intersections at 1.8 m/s.",
        tags: ["STM32", "PID CONTROL", "ROBOTICS", "EMBEDDED C"],
        githubUrl: "https://github.com/aravindshankar/stm32-pid-follower",
        schematicUrl: "https://github.com/aravindshankar/stm32-pid-follower/tree/main/firmware",
        artType: "pid-robot",
      },
      {
        id: "ecg-front-end",
        number: "05",
        title: "ECG SIGNAL FRONT-END",
        subtitle: "Low-Noise Biopotential Instrumentation Amplifier",
        shortDesc: "Medical-grade 3-lead analog conditioning chain with 120dB CMRR and 50Hz notch filter stage.",
        specs: {
          mcuOrChip: "Texas Instruments INA128 + TL074 Quad JFET Op-Amp",
          sensorsOrRadio: "3-Lead Ag/AgCl Surface Electrodes + Right-Leg Drive",
          protocol: "Differential Biopotential Sensing (0.05 Hz – 150 Hz)",
          tools: "LTspice XVII, MATLAB Pan-Tompkins Algorithm, Breadboard/PCB",
        },
        buildStory: "Crafted a low-noise biopotential amplifier with active Right-Leg Drive (RLD) circuitry to cancel 50 Hz common-mode mains interference. Verified simulation in LTspice with Monte Carlo tolerance analysis, followed by digital QRS peak detection in MATLAB.",
        tags: ["BIOMEDICAL", "ANALOG FRONT-END", "LTSPICE", "DSP"],
        githubUrl: "https://github.com/aravindshankar/ecg-analog-frontend",
        schematicUrl: "https://github.com/aravindshankar/ecg-analog-frontend/tree/main/circuits",
        artType: "ecg-front-end",
      },
      {
        id: "lora-node",
        number: "06",
        title: "LORA WEATHER NODE",
        subtitle: "Ultra-Low-Power Long-Range Environmental Station",
        shortDesc: "Solar-recharged remote meteorological telemetry node operating on 433 MHz with 14.8 µA sleep profile.",
        specs: {
          mcuOrChip: "ESP32-C3 RISC-V Single-Core + Semtech SX1278",
          sensorsOrRadio: "Bosch BME280 (Temp, Humidity, Barometric Pressure)",
          protocol: "LoRa Sub-GHz CSS Modulation (Spreading Factor 7–12)",
          tools: "KiCad 8, Nordic PPK2 Power Profiler, RadioLib",
        },
        buildStory: "Designed an autonomous outdoor environmental transmitter transmitting telemetry across a 4.2 km line-of-sight test link. Using custom deep-sleep state sequencing and low-quiescent LDO regulators, the node achieves an average sleep power draw of 14.8 µA, yielding multi-year autonomy on a 18650 LiFePO4 cell.",
        tags: ["LORA", "SUB-GHZ", "LOW POWER", "TELEMETRY"],
        githubUrl: "https://github.com/aravindshankar/lora-weather-node",
        schematicUrl: "https://github.com/aravindshankar/lora-weather-node/tree/main/hardware",
        artType: "lora-node",
      },
    ] as ProjectItem[],
  },

  services: {
    sectionTag: "CH.06 — TECHNICAL CAPABILITIES",
    headline: "WHAT I CAN BUILD",
    subtitle: "Specialised engineering services spanning from bare-metal silicon to finished circuit boards.",
    bottomBarText: "DELIVERABLES: SCHEMATIC, GERBER FILES, FIRMWARE, TEST REPORT",
    enquireLabel: "ENQUIRE",
    items: [
      {
        index: "01",
        title: "PCB DESIGN & ROUTING",
        description: "Schematic capture, high-speed differential routing, controlled impedance stackups, and production Gerber/BOM packages ready for JLCPCB/PCBWay fabrication.",
        tags: ["KiCad 8", "Altium", "4-Layer Stackup", "DFM / SMT"],
        deliverable: "Gerbers, Drill Files, Pick & Place, 3D STEP Model",
        artType: "pcb",
      },
      {
        index: "02",
        title: "EMBEDDED C & FIRMWARE",
        description: "Bare-metal and RTOS firmware for ARM Cortex-M, ESP32, and AVR architectures. Deterministic ISR dispatch, zero-copy DMA ring-buffers, and low-jitter execution.",
        tags: ["STM32", "FreeRTOS", "ESP-IDF", "DMA & Timers"],
        deliverable: "Clean C/C++ Codebase, Unit Tests, Pinout Configuration",
        artType: "firmware",
      },
      {
        index: "03",
        title: "FPGA & DIGITAL SYSTEM DESIGN",
        description: "RTL architecture in Verilog HDL, self-checking testbench verification, synthesis, and timing closure on Xilinx Artix-7 and Spartan FPGA targets.",
        tags: ["Verilog HDL", "Xilinx Vivado", "RTL Pipelining", "ModelSim"],
        deliverable: "Bitstream, Simulation Waveforms, RTL Source Modules",
        artType: "fpga",
      },
      {
        index: "04",
        title: "ANALOG & SENSOR FRONT-ENDS",
        description: "Instrumentation amplifiers, active filtering, signal conditioning, and high-resolution ADC interfacing with maximum SNR and noise immunity.",
        tags: ["LTspice XVII", "Op-Amp Filtering", "Noise Minimization", "Biopotential"],
        deliverable: "Simulation Reports, Noise Analysis, Schematic Files",
        artType: "analog",
      },
      {
        index: "05",
        title: "IOT PROTOTYPING & TELEMETRY",
        description: "End-to-end connected prototypes using Sub-GHz LoRa, BLE, and Wi-Fi with secure MQTT broker integration and microampere deep-sleep power budgeting.",
        tags: ["LoRa SX1278", "MQTT / TLS", "PPK2 Profiling", "Edge Sensor Nodes"],
        deliverable: "Working Prototypes, Firmware Images, Protocol Specs",
        artType: "iot",
      },
    ] as ServiceItem[],
  },

  contact: {
    sectionTag: "CH.07 — DIRECT TRANSMISSION",
    headline: "LET'S TALK",
    subtitle: "Open to embedded hardware internships, research collaborations, and PCB commissions.",
    email: "aravindshankar.ece@gmail.com",
    pillButtons: [
      { label: "INSTAGRAM", href: "https://instagram.com/aravindshankar", external: true },
      { label: "LINKEDIN", href: "https://linkedin.com/in/aravindshankar", external: true },
      { label: "GITHUB", href: "https://github.com/aravindshankar", external: true },
      { label: "CONTACT ME", href: "mailto:aravindshankar.ece@gmail.com", isPrimary: true, external: false },
    ],
    footerLeft: "PORTFOLIO. ALL RIGHTS RESERVED © 2026",
    footerRight: "HARDWARE & SYSTEMS BY ARAVIND SHANKAR",
    liveClockLabel: "LOCAL TIME, IST",
  },
};

