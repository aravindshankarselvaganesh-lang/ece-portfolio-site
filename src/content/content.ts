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
    departmentTag: "ELECTRONICS & COMMUNICATION ENGINEERING",
    headlineLine1: "ELECTRONICS",
    headlineLine2: "ENGINEERING",
    badgeLabel: "ECE UNDERGRADUATE, EST. 2026",
    bioSnippet: "BUILDING HARDWARE PROTOTYPES — FROM 4-LAYER PCBS TO BARE-METAL C FIRMWARE.",
    tags: ["EMBEDDED SYSTEMS", "PCB DESIGN", "VLSI / FPGA", "RF TELEMETRY"],
    scrollHint: "SCROLL TO INITIALIZE INSTRUMENTATION",
  },

  about: {
    headlinePart1: "ABOUT",
    headlinePart2: "ME",
    badge: "SYSTEM ARCHITECTURE & PROFILE",
    bioParagraphs: [
      "ECE undergraduate engineering high-reliability embedded systems — specializing in high-speed PCB routing, bare-metal ARM firmware, and FPGA digital design.",
      "Focused on clean hardware design: controlled impedance, deterministic low-jitter timing, and physical verification on the lab bench."
    ],
    facts: [
      {
        label: "EDUCATION & CGPA",
        value: "B.Tech ECE (Class of 2026) • CGPA: 9.42 / 10.0 • Rank #2",
      },
      {
        label: "CORE SKILLS",
        value: "4-Layer PCB Design, ARM Bare-Metal C, Verilog HDL, Analog Conditioning",
      },
      {
        label: "LAB BENCH",
        value: "100MHz 4-Ch DSO, 16-Ch Logic Analyzer, Nordic PPK2, NanoVNA",
      },
    ],
  },

  experience: {
    chapterTag: "CH.03 — CAREER TRAJECTORY",
    headline: "WHERE I'VE BEEN",
    subtitle: "Circuits, firmware, and hardware validation.",
    filterTabs: ["ALL", "LEARNING", "INTERNSHIPS", "CLUB"],
    panels: [
      {
        id: "exp-1",
        category: "LEARNING",
        tag: "ORIGIN & FOUNDATIONS",
        year: "2023 — 2024",
        bgWord: "EMBEDDED",
        title: "CORE HARDWARE & BARE-METAL C",
        subtitle: "Analog fundamentals & bare-metal AVR microcontrollers.",
        description: "Built transistor amplifiers, active op-amp filters, and bare-metal register drivers with timer interrupts.",
        columns: {
          hardware: "Discrete RLC circuits, op-amp active filters",
          firmware: "Bare-metal C, UART/SPI peripheral drivers",
          verification: "100MHz oscilloscope, bench DMM",
        },
      },
      {
        id: "exp-2",
        category: "CLUB",
        tag: "HARDWARE CLUB & BOARDS",
        year: "2024 — 2025",
        bgWord: "PCB",
        title: "STM32 ARCHITECTURE & PCB FABRICATION",
        subtitle: "Custom 4-layer STM32 boards & DMA pipelines.",
        description: "Routed 4-layer mixed-signal boards in KiCad. Built DMA circular buffers and USB CDC stacks on STM32.",
        columns: {
          hardware: "KiCad 8, 4-layer stackups, controlled impedance",
          firmware: "STM32CubeIDE, DMA ring-buffers, HAL/LL",
          verification: "Logic analyzers, ripple & jitter measurement",
        },
      },
      {
        id: "exp-3",
        category: "INTERNSHIPS",
        tag: "INDUSTRY EXPERIENCE",
        year: "SUMMER 2025",
        bgWord: "VLSI",
        title: "HARDWARE VALIDATION INTERN",
        subtitle: "Automated hardware testing & signal validation.",
        description: "Built automated Python test harnesses for industrial edge sensors, validating SPI/I2C buses and EMC pre-compliance.",
        columns: {
          hardware: "Sensor test jigs, EMC shielding fixtures",
          firmware: "Automated flashers, pySerial test suites",
          verification: "Protocol analyzers, thermal chamber logging",
        },
      },
      {
        id: "exp-4",
        category: "CLUB",
        tag: "CURRENT CAPSTONE",
        year: "2025 — 2026",
        bgWord: "IoT",
        title: "SUB-GHZ TELEMETRY & DISTRIBUTED NODES",
        subtitle: "Solar-powered LoRa telemetry mesh nodes.",
        description: "Deployed solar-powered SX1278 LoRa nodes with deep sleep optimization down to 14.8 µA across a 4.2 km RF link.",
        columns: {
          hardware: "Solar MPPT charger, sub-1µA quiescent LDOs",
          firmware: "FreeRTOS, MQTT-SN packet compression",
          verification: "Nordic PPK2, RF spectrum analyzer, 4.2km link",
        },
      },
    ] as ExperiencePanel[],
  },

  builds: {
    sectionTag: "CH.04 — HARDWARE BUILDS",
    label: "HARDWARE BUILDS",
    subtitle: "Physical prototypes, custom PCBs, and telemetry hardware.",
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
        subtitle: "ESP32 AC Power & Current Telemetry",
        shortDesc: "4 kHz AC sampling with true-RMS calculation and secure MQTT telemetry.",
        specs: {
          mcuOrChip: "ESP32-WROOM-32D Dual-Core 240MHz",
          sensorsOrRadio: "ACS712-20A Hall + ZMPT101B Voltage Transformer",
          protocol: "MQTT over TLS 1.3 / Wi-Fi 802.11 b/g/n",
          tools: "KiCad 8, FreeRTOS, ESP-IDF, InfluxDB",
        },
        buildStory: "Dual-core ESP32 design: Core 0 handles FreeRTOS TLS/MQTT networking; Core 1 runs 4 kHz zero-crossing sampling and true-RMS power math.",
        tags: ["ESP32", "POWER ELECTRONICS", "MQTT", "KICAD"],
        githubUrl: "https://github.com/aravindshankar/smart-energy-meter",
        schematicUrl: "https://github.com/aravindshankar/smart-energy-meter/tree/main/hardware",
        artType: "energy-meter",
      },
      {
        id: "fm-receiver",
        number: "02",
        title: "FM RECEIVER BOARD",
        subtitle: "TEA5767 RF Tuner & Audio Amplifier",
        shortDesc: "Stereo broadcast receiver with LC impedance matching and TDA2822M audio driver.",
        specs: {
          mcuOrChip: "Philips TEA5767 + TDA2822M + ATmega328P",
          sensorsOrRadio: "76–108 MHz RF Front-End with Telescopic LC network",
          protocol: "I2C Bus @ 100 kHz with digital PLL tuning",
          tools: "KiCad 8, RF Ground Pour, Spectrum Analyser",
        },
        buildStory: "Isolated RF PCB with single-point star grounding, automatic gain control (AGC), and real-time OLED RSSI metering.",
        tags: ["RF CIRCUITS", "ANALOG", "I2C", "PCB DESIGN"],
        githubUrl: "https://github.com/aravindshankar/fm-receiver-board",
        schematicUrl: "https://github.com/aravindshankar/fm-receiver-board/tree/main/schematics",
        artType: "fm-receiver",
      },
      {
        id: "fpga-alu",
        number: "03",
        title: "8-BIT ALU ON FPGA",
        subtitle: "16-Op Pipelined ALU in Verilog",
        shortDesc: "100 MHz synchronous ALU with carry-lookahead adders and overflow detection.",
        specs: {
          mcuOrChip: "Xilinx Artix-7 FPGA (Digilent Basys 3)",
          sensorsOrRadio: "16-Bit Switch Bus & 7-Segment Multiplexed Display",
          protocol: "Synchronous 100 MHz System Clock Pipeline",
          tools: "Vivado ML Edition, ModelSim, Verilog HDL (IEEE 1364)",
        },
        buildStory: "Synthesized 16-operation ALU on Artix-7 FPGA with carry-lookahead adders. Verified via 100k random vector testbenches in Vivado.",
        tags: ["VERILOG", "FPGA", "VIVADO", "DIGITAL LOGIC"],
        githubUrl: "https://github.com/aravindshankar/fpga-8bit-alu",
        schematicUrl: "https://github.com/aravindshankar/fpga-8bit-alu/tree/main/rtl",
        artType: "fpga-alu",
      },
      {
        id: "pid-robot",
        number: "04",
        title: "PID LINE-FOLLOWER ROBOT",
        subtitle: "Autonomous 500 Hz STM32 Line Follower",
        shortDesc: "Closed-loop 500 Hz PID tracking vehicle with 8-channel optical array.",
        specs: {
          mcuOrChip: "STM32F401RE ARM Cortex-M4 @ 84MHz",
          sensorsOrRadio: "8-Channel QTR-8A Infrared Reflectance Array",
          protocol: "Hardware Timer PWM @ 20 kHz + TB6612FNG Dual Driver",
          tools: "STM32CubeIDE, MATLAB Simulink, PID Tuning Tool",
        },
        buildStory: "Deterministic 500 Hz timer ISR PID controller in C. Tuned dynamics in MATLAB for zero-overshoot cornering at 1.8 m/s.",
        tags: ["STM32", "PID CONTROL", "ROBOTICS", "EMBEDDED C"],
        githubUrl: "https://github.com/aravindshankar/stm32-pid-follower",
        schematicUrl: "https://github.com/aravindshankar/stm32-pid-follower/tree/main/firmware",
        artType: "pid-robot",
      },
      {
        id: "ecg-front-end",
        number: "05",
        title: "ECG SIGNAL FRONT-END",
        subtitle: "Biopotential Amplifier Front-End",
        shortDesc: "3-lead medical analog conditioning with 120 dB CMRR and 50 Hz notch filter.",
        specs: {
          mcuOrChip: "Texas Instruments INA128 + TL074 Quad JFET Op-Amp",
          sensorsOrRadio: "3-Lead Ag/AgCl Surface Electrodes + Right-Leg Drive",
          protocol: "Differential Biopotential Sensing (0.05 Hz – 150 Hz)",
          tools: "LTspice XVII, MATLAB Pan-Tompkins Algorithm, Breadboard/PCB",
        },
        buildStory: "INA128 instrumentation amplifier with Right-Leg Drive (RLD) mains cancellation. Simulated in LTspice; QRS detection in MATLAB.",
        tags: ["BIOMEDICAL", "ANALOG FRONT-END", "LTSPICE", "DSP"],
        githubUrl: "https://github.com/aravindshankar/ecg-analog-frontend",
        schematicUrl: "https://github.com/aravindshankar/ecg-analog-frontend/tree/main/circuits",
        artType: "ecg-front-end",
      },
      {
        id: "lora-node",
        number: "06",
        title: "LORA WEATHER NODE",
        subtitle: "Solar 433 MHz LoRa Weather Station",
        shortDesc: "Solar-harvested meteorological station drawing 14.8 µA in sleep mode.",
        specs: {
          mcuOrChip: "ESP32-C3 RISC-V Single-Core + Semtech SX1278",
          sensorsOrRadio: "Bosch BME280 (Temp, Humidity, Barometric Pressure)",
          protocol: "LoRa Sub-GHz CSS Modulation (Spreading Factor 7–12)",
          tools: "KiCad 8, Nordic PPK2 Power Profiler, RadioLib",
        },
        buildStory: "SX1278 LoRa node transmitting over 4.2 km. Deep-sleep state sequencing delivers 14.8 µA average current for multi-year autonomy.",
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
    subtitle: "Hardware capabilities from schematic design to bare-metal firmware.",
    bottomBarText: "DELIVERABLES: SCHEMATIC, GERBER FILES, FIRMWARE, TEST REPORT",
    enquireLabel: "ENQUIRE",
    items: [
      {
        index: "01",
        title: "PCB DESIGN & ROUTING",
        description: "Schematic capture, high-speed routing, and production-ready Gerbers (KiCad 8 / Altium).",
        tags: ["KiCad 8", "Altium", "4-Layer Stackup", "DFM / SMT"],
        deliverable: "Gerbers, Drill Files, Pick & Place, 3D STEP Model",
        artType: "pcb",
      },
      {
        index: "02",
        title: "EMBEDDED C & FIRMWARE",
        description: "Bare-metal & FreeRTOS firmware for STM32 and ESP32 with DMA ring-buffers and low-jitter timers.",
        tags: ["STM32", "FreeRTOS", "ESP-IDF", "DMA & Timers"],
        deliverable: "Clean C/C++ Codebase, Unit Tests, Pinout Configuration",
        artType: "firmware",
      },
      {
        index: "03",
        title: "FPGA & DIGITAL SYSTEM DESIGN",
        description: "Verilog RTL architecture, testbench simulation, and synthesis on Xilinx Artix-7 FPGAs.",
        tags: ["Verilog HDL", "Xilinx Vivado", "RTL Pipelining", "ModelSim"],
        deliverable: "Bitstream, Simulation Waveforms, RTL Source Modules",
        artType: "fpga",
      },
      {
        index: "04",
        title: "ANALOG & SENSOR FRONT-ENDS",
        description: "Instrumentation amplifiers, active analog filters, and low-noise ADC signal conditioning.",
        tags: ["LTspice XVII", "Op-Amp Filtering", "Noise Minimization", "Biopotential"],
        deliverable: "Simulation Reports, Noise Analysis, Schematic Files",
        artType: "analog",
      },
      {
        index: "05",
        title: "IOT PROTOTYPING & TELEMETRY",
        description: "Sub-GHz LoRa, BLE, and MQTT IoT nodes with microampere power budgeting.",
        tags: ["LoRa SX1278", "MQTT / TLS", "PPK2 Profiling", "Edge Sensor Nodes"],
        deliverable: "Working Prototypes, Firmware Images, Protocol Specs",
        artType: "iot",
      },
    ] as ServiceItem[],
  },

  contact: {
    sectionTag: "CH.07 — DIRECT TRANSMISSION",
    headline: "LET'S TALK",
    subtitle: "Open for hardware & embedded engineering internships.",
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

