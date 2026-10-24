import corset01ImageC11 from '../assets/images/C1.1.jpg';
import corset01ImageC12 from '../assets/images/C1.2.png';
import corset01ImageC13 from '../assets/images/C1.3.jpg';
import corset2ImageC41 from '../assets/images/C4.1.jpg';
import corset2ImageC42 from '../assets/images/C4.2.jpeg';
import corset2ImageC43 from '../assets/images/C4.3.jpg';
import corset2ImageC44 from '../assets/images/C4.4.jpeg';
import corset2ImageC45 from '../assets/images/C4.5.jpeg';
import corset3ImageC1 from '../assets/images/C1.jpeg';
import corset3ImageC2 from '../assets/images/C2.jpeg';
import corset3ImageC3 from '../assets/images/C3.jpeg';
import corset3ImageC4 from '../assets/images/C4.png';
import corset4ImageC51 from '../assets/images/C5.1.jpeg';
import corset4ImageC52 from '../assets/images/C5.2.jpeg';
import corset4ImageC53 from '../assets/images/C5.3.jpeg';
import corset4ImageC54 from '../assets/images/C5.4.jpeg';
export interface CorsetProject {
  id: string;
  number: string;
  title: string;
  name: string;
  /**
   * Fixed image slots controlled strictly in code through AI Studio.
   * Assign image imports or URLs to display, or set to null for a clean empty placeholder.
   */
  images: (string | null)[];
  description: string;
}

/**
 * STATIC CORSET PROJECT DEFINITIONS (Controlled exclusively via AI Studio)
 * 
 * Workflow to change images:
 * 1. Import or specify the image path in this file
 * 2. Assign it to the desired corset and slot index in the `images` array
 * 3. Deploy/update the applet in AI Studio
 * 
 * Visitors on the public portfolio will see exactly the images assigned below.
 */
export const staticCorsetProjects: CorsetProject[] = [
  {
    id: 'corset-01',
    number: '01',
    title: 'CORSET 01',
    name: 'THE REWOVEN STORY',
    images: [
      corset01ImageC11,
      corset01ImageC12,
      corset01ImageC13,
    ],
    description: 'Crafted from upcycled denim, this corset transforms discarded fabric into a statement of sustainable fashion. The structured silhouette is balanced with intricate embroidery details, adding softness and artistry to the rugged texture of denim. Every stitch reflects the harmony between strength and delicacy, turning reclaimed material into wearable art.',
  },
  {
    id: 'corset-02',
    number: '02',
    title: 'CORSET 02',
    name: 'THE SCARLET DUST',
    images: [
      corset2ImageC41,
      corset2ImageC42,
      corset2ImageC43,
      corset2ImageC44,
      corset2ImageC45,
    ],
    description: 'A deep red velvet corset designed with asymmetrical detailing to create a silhouette that feels both bold and elegant. The richness of velvet paired with sharp structure gives the garment a dramatic yet timeless presence.',
  },
  {
    id: 'corset-03',
    number: '03',
    title: 'CORSET 03',
    name: 'MY BOLLYWOOD ERA',
    images: [
      corset3ImageC1,
      corset3ImageC2,
      corset3ImageC3,
      corset3ImageC4,
    ],
    description: 'Inspired by the drama, glamour, and timeless allure of Bollywood, this corset celebrates bold femininity and cinematic elegance. Its construction features multiple layers, creating depth, texture, and a sculpted silhouette. The rich burgundy tones and intricate surface detailing capture the essence of a statement piece, blending traditional glamour with contemporary styling.',
  },
  {
    id: 'corset-04',
    number: '04',
    title: 'CORSET 04',
    name: 'THE BOLD BADDIE',
    images: [
      corset4ImageC51,
      corset4ImageC52,
      corset4ImageC53,
      corset4ImageC54,
    ],
    description: 'This corset is a bold fusion of elegance and drama, designed to create a striking visual contrast through texture, structure, and transparency. Crafted with black satin pleats along the bust area, the garment highlights sculpted detailing and refined craftsmanship while enhancing the silhouette with a luxurious finish.',
  },
];
