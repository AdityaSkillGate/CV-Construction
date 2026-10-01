import { Injectable } from '@angular/core';
import { Project, ServiceItem, ProcessStep, StatItem, WhyFeature, TestimonialItem, ConstructionStage } from '../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectDataService {
  
  getConstructionStages(): ConstructionStage[] {
    return [
      {
        number: '01',
        title: 'FOUNDATION',
        description: 'Sub-grade excavation, pile caps, and reinforced concrete basement matrix engineered for seismic resistance.',
        percentRange: [0, 15],
        metrics: { 'Depth': '12.5m Sub-grade', 'Concrete': 'M40 Grade Reinforced', 'Piles': '142 Driven Piles' }
      },
      {
        number: '02',
        title: 'STRUCTURE',
        description: 'Erection of structural steel skeleton, heavy column grids, and primary load-bearing shear walls.',
        percentRange: [15, 30],
        metrics: { 'Steel': 'Grade 500D TMT', 'Tolerance': '±2mm Laser Aligned', 'Core': 'Twin Lift Shafts' }
      },
      {
        number: '03',
        title: 'BUILDING',
        description: 'Post-tensioned suspended concrete slabs, floor casting, and structural perimeter perimeter beams.',
        percentRange: [30, 48],
        metrics: { 'Slab Span': '11.5m Column-free', 'Curing': 'Continuous Hydro', 'Floor Load': '5.0 kN/m²' }
      },
      {
        number: '04',
        title: 'PROGRESS',
        description: 'Intermediate multi-level vertical framework advancing towards full structural topping-out.',
        percentRange: [48, 65],
        metrics: { 'Levels': '6 Finished Decks', 'Crane Ops': 'Precision Tower Crane', 'Safety': 'Zero Incident Record' }
      },
      {
        number: '05',
        title: 'FACADE',
        description: 'Double-glazed curtain wall installation, acoustic seals, and thermal break aluminum mullions.',
        percentRange: [65, 80],
        metrics: { 'Glass': 'Low-E Acoustic Glazing', 'Wind Spec': 'Class 4 Tested', 'Thermal': 'U-Value 1.4 W/m²K' }
      },
      {
        number: '06',
        title: 'FINISHING',
        description: 'High-performance MEP services, HVAC ducting, architectural interior fit-out, and rooftop canopy assembly.',
        percentRange: [80, 92],
        metrics: { 'HVAC': 'VRF High Efficiency', 'Lighting': 'Integrated LED DALI', 'Fire Code': 'NFPA Compliant' }
      },
      {
        number: '07',
        title: 'COMPLETION',
        description: 'Final commissioning, architectural lighting calibration, safety compliance sign-off, and turnkey handover.',
        percentRange: [92, 100],
        metrics: { 'Handover': 'Ready For Occupancy', 'Certification': 'LEED Gold Standard', 'Warranty': '10-Year Structural' }
      }
    ];
  }

  getStats(): StatItem[] {
    return [
      {
        value: 15,
        suffix: '+',
        label: 'Years Experience',
        description: 'Delivering landmark construction across commercial, residential, and industrial domains.'
      },
      {
        value: 120,
        suffix: '+',
        label: 'Projects Delivered',
        description: 'Precision-engineered structures built on schedule and within exacting tolerances.'
      },
      {
        value: 85,
        suffix: '+',
        label: 'Professionals',
        description: 'Chartered structural engineers, BIM architects, project managers, and master craftspeople.'
      },
      {
        value: 98,
        suffix: '%',
        label: 'Client Satisfaction',
        description: 'Long-term repeat partnerships based on uncompromised quality and absolute transparency.'
      }
    ];
  }

  getServices(): ServiceItem[] {
    return [
      {
        number: '01',
        title: 'Residential Construction',
        tagline: 'Homes designed around the way people live.',
        description: 'From bespoke architectural villas to luxury multi-family towers, we combine spatial intelligence, premium materials, and structural permanence.',
        icon: 'home-modern',
        features: ['Bespoke Architectural Engineering', 'Acoustic & Thermal Optimization', 'Smart Home Infrastructure', 'Sustainable Living Standards']
      },
      {
        number: '02',
        title: 'Commercial Construction',
        tagline: 'High-performance spaces built for modern business.',
        description: 'Corporate headquarters, tech campuses, and flexible commercial spaces designed to foster innovation, collaboration, and operational efficiency.',
        icon: 'building-office',
        features: ['Column-Free Flexible Floorplates', 'LEED & WELL Certified Efficiency', 'Advanced Data & Power Redundancy', 'Curtain Wall Facade Systems']
      },
      {
        number: '03',
        title: 'Industrial Construction',
        tagline: 'Engineered structures built for demanding environments.',
        description: 'Logistics hubs, manufacturing facilities, and heavy industrial warehouses engineered with heavy-duty foundations and uninterrupted clear spans.',
        icon: 'cog',
        features: ['Heavy Dynamic Load Capacities', 'Pre-Engineered Steel Frames (PEB)', 'Super-Flat Flooring Tolerance', 'Hazard Mitigation & Safety Protocols']
      },
      {
        number: '04',
        title: 'Renovation & Restoration',
        tagline: 'Existing spaces reimagined with precision.',
        description: 'Structural retrofitting, adaptive reuse, and heritage modernization that preserve architectural character while integrating 21st-century building systems.',
        icon: 'sparkles',
        features: ['Seismic Retrofitting & Carbon Reinforcement', 'Facade Re-engineering', 'MEP System Overhauls', 'Historic Material Conservation']
      },
      {
        number: '05',
        title: 'Turnkey Projects',
        tagline: 'From concept to completion, we manage every stage.',
        description: 'Single-source accountability from architectural schematic design, statutory approvals, and structural BIM modeling through physical handover.',
        icon: 'check-badge',
        features: ['Integrated BIM 4D/5D Modeling', 'Guaranteed Maximum Price (GMP)', 'Comprehensive Regulatory Approvals', 'Complete Lifecycle Commissioning']
      }
    ];
  }

  getProjects(): Project[] {
    return [
      {
        id: 'skyline-horizon',
        name: 'Skyline Horizon Tower',
        location: 'Financial District, Metro City',
        category: 'Commercial',
        year: '2025',
        area: '185,000 sq.ft',
        completion: '100% Handover',
        imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
        secondaryImage: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=1000&q=80',
        description: 'A 6-story architectural headquarters featuring uninterrupted glass curtain walls, double-height executive atrium, and LEED Gold energy-efficient envelope.',
        highlights: ['High-performance solar control Low-E glazing', 'Central seismic concrete core with post-tensioned slabs', 'Automated building management and circadian lighting'],
        client: 'Horizon Global Ventures'
      },
      {
        id: 'nexus-tech-park',
        name: 'The Nexus Innovation Park',
        location: 'Cyber Corridor, South Sector',
        category: 'Commercial',
        year: '2024',
        area: '320,000 sq.ft',
        completion: 'Completed On Schedule',
        imageUrl: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80',
        secondaryImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80',
        description: 'Interconnected tech campus engineered for flexible modern workforces, incorporating rainwater harvesting, solar canopy arrays, and column-free workspaces.',
        highlights: ['Collaborative pedestrian sky-bridges', 'BIM Level 3 coordination reducing clashes to zero', '50,000 sq.ft biophilic central landscaped plaza'],
        client: 'Nexus Systems Group'
      },
      {
        id: 'aura-residences',
        name: 'Aura Luxury Residences',
        location: 'Bayview Heights',
        category: 'Residential',
        year: '2025',
        area: '95,000 sq.ft',
        completion: 'Phase 1 Occupancy',
        imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
        secondaryImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=80',
        description: 'Collection of luxury architectural residences featuring panoramic floor-to-ceiling glass, acoustic isolation between residences, and cantilevered infinity terraces.',
        highlights: ['Private elevator vestibules', 'Custom Italian terrazzo and engineered hardwood finishes', 'Earthquake-engineered shear wall substructure'],
        client: 'Aura Living Properties'
      },
      {
        id: 'vertex-logistics',
        name: 'Vertex Industrial Logistics Center',
        location: 'Industrial Corridor Zone 4',
        category: 'Industrial',
        year: '2024',
        area: '450,000 sq.ft',
        completion: 'Fully Operational',
        imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
        secondaryImage: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1000&q=80',
        description: 'Heavy-duty industrial fulfillment and cold storage terminal featuring 14m clear heights, laser-screed superflat industrial floors, and 48 automated loading docks.',
        highlights: ['FM2 special tolerance slab rating', 'Integrated sprinkler ESFR fire containment system', 'Heavy commercial vehicle maneuvering aprons'],
        client: 'Vertex Supply Chain Ltd.'
      },
      {
        id: 'heritage-restoration',
        name: 'The Grand Heritage Reimagined',
        location: 'Historic Boulevard, Old Quarter',
        category: 'Renovation',
        year: '2023',
        area: '62,000 sq.ft',
        completion: 'Preservation Award Winner',
        imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
        secondaryImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80',
        description: 'Careful structural stabilization and modern glass pavilion addition to an iconic masonry heritage landmark, harmonizing classical elegance with contemporary engineering.',
        highlights: ['Carbon-fiber reinforced polymer (CFRP) structural strengthening', 'Reversible architectural glass insertion', 'Zero destruction of historic facade stones'],
        client: 'Metropolitan Arts Foundation'
      },
      {
        id: 'zenith-turnkey',
        name: 'Zenith Advanced Research Hub',
        location: 'Bio-Medical Park',
        category: 'Turnkey',
        year: '2025',
        area: '140,000 sq.ft',
        completion: 'Commissioned & Validated',
        imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
        secondaryImage: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1000&q=80',
        description: 'Turnkey biotechnology research center delivered from bare site to cleanroom certification in 18 months, featuring vibration-isolated laboratory floor slabs.',
        highlights: ['Cleanroom ISO Class 6 certified environments', 'Single-contract design, MEP, validation, and delivery', 'Zero schedule slippage with digital twin tracking'],
        client: 'Zenith Biosciences'
      }
    ];
  }

  getProcessSteps(): ProcessStep[] {
    return [
      {
        step: '01',
        title: 'DISCOVER',
        subtitle: 'Vision & Geotechnical Evaluation',
        description: 'Comprehensive site surveying, soil core testing, regulatory zoning study, and client vision workshops to establish unbreakable project foundations.',
        duration: 'Weeks 1 – 4',
        deliverables: ['Geotechnical Soil Reports', 'Statutory Zoning Feasibility', 'Project Vision Charter', 'Preliminary Budget Estimate']
      },
      {
        step: '02',
        title: 'DESIGN',
        subtitle: 'BIM Modeling & Engineering Rigor',
        description: 'Architectural schematic development, multi-disciplinary 3D BIM clash detection, structural stress analysis, and sustainable material specification.',
        duration: 'Weeks 5 – 12',
        deliverables: ['3D Architectural Models', 'Structural Calculations & Certifications', 'Facade Engineering Drawings', 'Material Specifications']
      },
      {
        step: '03',
        title: 'PLAN',
        subtitle: 'Precision Scheduling & Procurement',
        description: 'Granular critical path method (CPM) sequencing, supply chain material lock-in, contractor vetting, and local authority municipal approvals.',
        duration: 'Weeks 13 – 18',
        deliverables: ['Detailed 4D Master Schedule', 'Guaranteed Maximum Cost Schedule', 'Municipal Building Permits', 'Safety & Quality Auditing Plan']
      },
      {
        step: '04',
        title: 'BUILD',
        subtitle: 'Rigorous Physical Construction',
        description: 'On-site execution managed by chartered engineers with continuous concrete batch testing, structural laser alignment, and strict daily safety oversight.',
        duration: 'Months 5 – 20',
        deliverables: ['Daily Digital Progress Tracking', 'Third-Party Material Lab Reports', 'Milestone Structural Sign-offs', 'Zero-Accident Safety Adherence']
      },
      {
        step: '05',
        title: 'DELIVER',
        subtitle: 'Testing, Commissioning & Handover',
        description: 'Full MEP systems balancing, building envelope acoustic & weather pressure testing, statutory occupancy certification, and turnkey key handover.',
        duration: 'Final Month',
        deliverables: ['As-Built BIM Documentation', 'Statutory Occupancy Certificate (OC)', 'Operations & Maintenance Manuals', '10-Year Structural Warranty']
      }
    ];
  }

  getWhyFeatures(): WhyFeature[] {
    return [
      {
        title: 'PRECISION',
        tagline: 'Millimeter-Accurate Execution',
        description: 'We eliminate guesswork through laser alignment, automated BIM clash detection, and certified structural engineering at every single joint.',
        icon: 'ruler'
      },
      {
        title: 'QUALITY',
        tagline: 'Uncompromising Structural Integrity',
        description: 'Every batch of concrete, steel reinforcement, and facade glass undergoes certified independent lab verification before physical installation.',
        icon: 'shield-check'
      },
      {
        title: 'TRANSPARENCY',
        tagline: 'Clear Milestones & Honest Accounting',
        description: 'Clients receive live milestone reports, drone site footage, and transparent cost tracking with zero hidden fees or unpleasant surprises.',
        icon: 'eye'
      },
      {
        title: 'RELIABILITY',
        tagline: '100% On-Time Handover Record',
        description: 'Our disciplined project management culture and robust procurement logistics ensure your landmark project is delivered exactly when promised.',
        icon: 'clock'
      }
    ];
  }

  getTestimonials(): TestimonialItem[] {
    return [
      {
        quote: 'GV Construction delivered our 6-story headquarters two weeks ahead of schedule. Their attention to detail on the glass facade and structural alignment was world-class.',
        author: 'Vikramaditya Mehta',
        role: 'Managing Director',
        organization: 'Horizon Global Ventures',
        project: 'Skyline Horizon Tower',
        rating: 5,
        avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
      },
      {
        quote: 'Managing a 320,000 sq.ft tech campus requires exceptional coordination. GV Construction brought digital BIM rigor that prevented delays and delivered immense value.',
        author: 'Sunita Ramanathan',
        role: 'Head of Infrastructure',
        organization: 'Nexus Systems Group',
        project: 'The Nexus Innovation Park',
        rating: 5,
        avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80'
      },
      {
        quote: 'Their turnkey execution removed the headaches of dealing with dozens of vendors. From municipal clearances to the final structural handover, GV Construction was flawless.',
        author: 'Arun K. Pillai',
        role: 'Chief Operating Officer',
        organization: 'Zenith Biosciences',
        project: 'Zenith Advanced Research Hub',
        rating: 5,
        avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80'
      }
    ];
  }
}
