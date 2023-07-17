export const initialProductData = {
  category: "",
  name: "",
  photo: "",
  rating: 5,
  starting_quantity: null,
  starting_price: null,
  cover: "",
  information: "",
  options: [
    {
      title: "",
      description: ""
    }
  ],
  artwork: {
    instruction: "",
    content: [
      {
        title: "",
        description: ""
      }
    ]
  },
  templates: {
    instruction: "",
    content: [
      {
        format: "",
        pdf: "",
        image: ""
      }
    ]
  },
  faq: {
    instruction: "",
    content: [
      {
        question: "",
        answer: ""
      }
    ]
  },
  design_services: [
    {
      title: "",
      price: null,
      services: [
          {content: ""}
      ]
    }
  ],
  features: [
    {
      placeholder: "",
      allow_customize: false,
      value: [
        {
          is_default: false,
          is_popular: false,
          photo: "",
          title: "",
          description: ""
        }
      ]
    }
  ],
  variants: {
    placeholder: "",
    value: [
      {
        is_default: false,
        is_popular: false,
        photo: "",
        title: "",
        description: "",
        subvariant: {
          placeholder: "",
          value: [
            {
              is_default: false,
              is_popular: false,
              photo: "",
              title: "",
              description: "",
              rp: "",
              dp: "",
              price: [
                {
                  quantity: "",
                  price: "",
                  is_best_seller: false
                }
              ]
            }
          ]
        },
        rp: "",
        dp: "",
        price: [
          {
            quantity: "",
            price: "",
            is_best_seller: false
          }
        ]
      }
    ]
  },
  rp: null,
  dp: null,
  price: [
    {
      quantity: '',
      price: '',
      is_best_seller: false
    }
  ]
};
