import { ProductType } from '../types';

export const mockProducts: ProductType[] = [
  {
    id: 'pt-1',
    name: 'Ped',
    tab: 'menstrual',
    subTypes: [
      {
        id: 'st-pad-std', name: 'Standart Ped', products: [
          { id: 'p1', size: 10, price: 100 }, { id: 'p2', size: 20, price: 190 }, { id: 'p3', size: 30, price: 278 }
        ]
      },
      {
        id: 'st-pad-super', name: 'Süper Ped', products: [
          { id: 'p4', size: 10, price: 110 }, { id: 'p5', size: 20, price: 210 }, { id: 'p6', size: 30, price: 300 }
        ]
      },
      {
        id: 'st-pad-superplus', name: 'Süper+ Ped', products: [
          { id: 'p7', size: 10, price: 120 }, { id: 'p8', size: 20, price: 230 }, { id: 'p9', size: 30, price: 330 }
        ]
      }
    ]
  },
  {
    id: 'pt-2',
    name: 'Günlük Ped',
    tab: 'daily',
    subTypes: [
      {
        id: 'st-panty-std', name: 'Standart Günlük Ped', products: [
          { id: 'p10', size: 10, price: 50 }, { id: 'p11', size: 20, price: 95 }, { id: 'p12', size: 30, price: 140 }
        ]
      },
      {
        id: 'st-panty-long', name: 'Süper Günlük Ped', products: [
          { id: 'p13', size: 10, price: 60 }, { id: 'p14', size: 20, price: 110 }, { id: 'p15', size: 30, price: 160 }
        ]
      }
    ]
  },
  {
    id: 'pt-3',
    name: 'Tampon',
    tab: 'menstrual',
    subTypes: [
      {
        id: 'st-tampon-mini', name: 'Mini Tampon', products: [
          { id: 'p16', size: 10, price: 100 }, { id: 'p17', size: 20, price: 190 }, { id: 'p18', size: 30, price: 278 }
        ]
      },
      {
        id: 'st-tampon-std', name: 'Standart Tampon', products: [
          { id: 'p19', size: 10, price: 105 }, { id: 'p20', size: 20, price: 200 }, { id: 'p21', size: 30, price: 290 }
        ]
      },
      {
        id: 'st-tampon-super', name: 'Süper Tampon', products: [
          { id: 'p22', size: 10, price: 115 }, { id: 'p23', size: 20, price: 215 }, { id: 'p24', size: 30, price: 310 }
        ]
      }
    ]
  }
];
