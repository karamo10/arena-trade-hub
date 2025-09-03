const products = [
    { id: 1, name: '50kg Rice', image_url: '/images/rice.jpeg', price: 2500 , categorie: 'rice'},
    { id: 2, name: '5L Oil', image_url: '/images/oil2.jpeg', price: 2500, categorie: 'oil' },
  { id: 3, name: '5L Palm Oil', image_url: '/images/palm-oil.jpeg', price: 2500, categorie: 'oil' },
  { id: 4, name: '5L Palm Oil', image_url: '/images/products/oil-2.jpeg', price: 2500, categorie: 'oil' },
  { id: 5, name: '5L Palm Oil', image_url: '/images/products/veg-oil-5l.jpeg', price: 2500, categorie: 'oil' },
    { id: 6, name: '5L Palm Oil', image_url: '/images/products/veg-oil-25l.jpeg', price: 2500, categorie: 'oil' },
    { id: 7, name: '25kg Onion', image_url: '/images/onion-bag.jpeg', price: 2500 , categorie: 'mix'},
    { id: 8, name: '1L Vinaigre', image_url: '/images/vinaigre.jpeg', price: 2500, categorie: 'mix' },
  { id: 9, name: '50kg Rice', image_url: '/images/products/american-rice.jpeg', price: 2500, categorie: 'rice' },
  { id: 10, name: '50kg Sadam Rice', image_url: '/images/products/sadam-rice.jpeg', price: 2500, categorie: 'rice' },
  { id: 11, name: '50kg Sadam Rice', image_url: '/images/products/armanti-5l.jpeg', price: 2500, categorie: 'armanti' },
  { id: 12, name: '50kg Sadam Rice', image_url: '/images/products/armanti-500ml.jpeg', price: 2500, categorie: 'armanti' },
  { id: 13, name: '50kg Sadam Rice', image_url: '/images/products/armanti.jpeg', price: 2500, categorie: 'armanti' },
    { id: 14, name: '1L Vinaigre', image_url: '/images/products/bag-potatoes.jpeg', price: 2500, categorie: 'mix' },
];


 const topSales = [
    {
      id: 1,
      name: "50kg rice",
      price: 1000,
      image_url: "/images/rice.jpeg",
    },
    {
      id: 2,
      name: "2litr Palm Oil",
      price: 2500,
      image_url: "/images/onion-bag.jpeg",
    },
    {
      id: 3,
      name: "1litr Vinaigre",
      price: 5000,
      image_url: "/images/vinaigre.jpeg",

    }
  ]



const aboutServices = [
  {
    id: 1,
    title: "Guaranteed Quality",
    icon_name: "ShieldCheckIcon",
    description: "We ensure that all our products meet the highest quality standards, giving you confidence in every purchase."
  },
  {
    id: 2,
    title: "Fast & Affordable Delivery",
    icon_name: "TruckIcon",
    description: "Get your orders delivered quickly and at affordable rates, no matter where you are."
  },
  {
    id: 3,
    title: "24/7 Customer Support",
    icon_name: "ChatBubbleLeftRightIcon",
    description: "Our support team is available around the clock to assist you with any inquiries or issues."
  }
] as const;


export { products, topSales, aboutServices, };