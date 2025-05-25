export interface Product {
  id: string;
  name: string;
  forSkinType: string[];
  composition: string[];
  description: string;
  img: string;
  link: string;
}

export const products: Product[] = [
  {
    "id": "lorsia-3ha",
    "name": "L'orsia 3HA Cleanser",
    "forSkinType": ["oily"],
    "composition": ["AHA", "BHA", "Gluconolactone", "Benzoyl Peroxidase (BPO)"],
    "description": "Sữa rửa mặt làm sạch sâu, giảm nhờn, ngừa mụn với AHA, BHA, PHA.",
    "img": "https://res.cloudinary.com/dlod5bte9/image/upload/v1747996081/product/kjpgefofbhxcqmt2bjw1.jpg",
    "link": "https://lorsia.vn/sanpham/sua-rua-mat-sach-sau-giam-nhon-ngua-mun-lorsia-3ha-aha-bha-pha-200ml/"
  },
  {
    "id": "la-roche-posay-effaclar",
    "name": "La Roche-Posay Effaclar Medicated Gel Cleanser",
    "forSkinType": ["oily"],
    "composition": ["BHA", "Benzoyl Peroxidase (BPO)"],
    "description": "Gel rửa mặt trị mụn, làm sạch sâu, giảm nhờn hiệu quả.",
    "img": "https://res.cloudinary.com/dlod5bte9/image/upload/v1747996081/product/ooudwsvkn5qbtvrafp4z.webp",
    "link": "https://www.laroche-posay.us/our-products/face/acne-products/effaclar-medicated-acne-face-wash-effaclaracnewash.html"
  },
  {
    "id": "cerave-foaming",
    "name": "CeraVe Foaming Facial Cleanser",
    "forSkinType": ["combination", "oily"],
    "composition": ["BHA", "Niacinamide"],
    "description": "Sữa rửa mặt dạng gel giúp làm sạch sâu, loại bỏ bụi bẩn và dầu thừa.",
    "img": "https://res.cloudinary.com/dlod5bte9/image/upload/v1747996083/product/a8wfx7b3lhot8dpzoekl.webp",
    "link": "https://www.cerave.com/our-products/cleansers/foaming-facial-cleanser"
  },
  {
    "id": "neutrogena-oil-free",
    "name": "Neutrogena Oil-Free Acne Wash",
    "forSkinType": ["oily"],
    "composition": ["BHA", "AHA", "Benzoyl Peroxidase (BPO)"],
    "description": "Sữa rửa mặt trị mụn, giúp làm sạch sâu và ngăn ngừa mụn tái phát.",
    "img": "https://res.cloudinary.com/dlod5bte9/image/upload/v1747996082/product/v2ymjuhqnglaybrchmoc.png",
    "link": "https://www.neutrogena.com/products/skincare/oil-free-acne-wash-with-salicylic-acid/6811719"
  },
  {
    "id": "the-ordinary-squalane",
    "name": "The Ordinary Squalane Cleanser",
    "forSkinType": ["dry", "sensitive"],
    "composition": ["Squalane", "Azelaic Acid"],
    "description": "Sữa rửa mặt dịu nhẹ, làm sạch sâu mà không làm khô da.",
    "img": "https://res.cloudinary.com/dlod5bte9/image/upload/v1747996080/product/z3uxnbmogbhmppgus5ps.jpg",
    "link": "https://ordinary.com.vn/shop/sua-rua-mat-tay-trang-the-ordinary-squalane-cleanser/"
  },
  {
    "id": "differin-gel",
    "name": "Differin Gel 0.1% Adapalene",
    "forSkinType": ["oily"],
    "composition": ["Retinoid"],
    "description": "Retinoid OTC giúp điều trị mụn viêm, mụn đầu đen hiệu quả.",
    "img": "https://res.cloudinary.com/dlod5bte9/image/upload/v1747996082/product/msdw6vzh4cv1i96uu6an.webp",
    "link": "https://differin.com/shop/differin-gel/3029949.html"
  },
  {
    "id": "paulas-choice-bpo",
    "name": "Paula's Choice Clear Acne Cleanser",
    "forSkinType": ["oily"],
    "composition": ["Benzoyl Peroxidase (BPO)"],
    "description": "Sữa rửa mặt chứa BPO giúp điều trị mụn viêm, mụn mủ hiệu quả.",
    "img": "https://res.cloudinary.com/dlod5bte9/image/upload/v1747996081/product/jiuwllhlyid4rt1rkdeg.jpg",
    "link": "https://paulaschoice.vn/clear-pore-normalizing-cleanser"
  },
  {
    "id": "the-ordinary-azelaic",
    "name": "The Ordinary Azelaic Acid Suspension 10%",
    "forSkinType": ["sensitive"],
    "composition": ["Azelaic Acid"],
    "description": "Kem hỗ trợ làm sáng da, giảm mụn và đỏ da.",
    "img": "https://res.cloudinary.com/dlod5bte9/image/upload/v1747996083/product/qhzkfp7enxuqmm7luae1.jpg",
    "link": "https://ordinary.com.vn/shop/kem-duong-tri-mun-the-ordinary-azelaic-acid-suspension-10/"
  },
  {
    "id": "retin-a-cream",
    "name": "Retin-A Tretinoin Cream 0.05%",
    "forSkinType": ["oily"],
    "composition": ["Retinoid"],
    "description": "Kem kê đơn mạnh mẽ giúp trị mụn và làm sáng da.",
    "img": "https://res.cloudinary.com/dlod5bte9/image/upload/v1747996082/product/dhcyybjwj3pjr2wrkhus.jpg",
    "link": "https://nhathuocminhchau.com/kem-tri-mun-vitara-acnetin-a-cream-005-tuyp-10g"
  },
  {
    "id": "paulas-choice-aha-bha",
    "name": "Paula's Choice Skin Perfecting 2% BHA Liquid Exfoliant",
    "forSkinType": ["oily"],
    "composition": ["BHA", "AHA"],
    "description": "Tẩy tế bào chết hóa học giúp làm sạch lỗ chân lông và giảm mụn.",
    "img": "https://res.cloudinary.com/dlod5bte9/image/upload/v1747996082/product/xdkae2erwo5uzmmktiut.avif",
    "link": "https://www.paulaschoice.com/skin-perfecting-2pct-bha-liquid-exfoliant/201.html"
  },
  {
    "id": "the-ordinary-peeling",
    "name": "The Ordinary AHA 30% + BHA 2% Peeling Solution",
    "forSkinType": ["dry", "sensitive"],
    "composition": ["AHA", "BHA"],
    "description": "Tẩy da chết hóa học giúp làm mờ sẹo mụn, sáng da, và làm sạch sâu.",
    "img": "https://res.cloudinary.com/dlod5bte9/image/upload/v1747996081/product/mb1x8yjudh88s64aecbr.jpg",
    "link": "https://ordinary.com.vn/shop/serum-tay-te-bao-chet-cai-thien-mun-vet-tham-tai-tao-da-the-ordinary-aha-30-bha-2-peeling-solution/"
  },
  {
    "id": "retin-a-cream-dry",
    "name": "Retin-A Cream 0.025%",
    "forSkinType": ["dry"],
    "composition": ["Retinoid"],
    "description": "Kem trị mụn nhẹ dịu dành cho da khô, giúp làm sạch nhân mụn milium.",
    "img": "https://res.cloudinary.com/dlod5bte9/image/upload/v1747996083/product/sjers5tcm19oewahn0hc.webp",
    "link": "https://shopee.vn/Kem-%C4%90%E1%BA%A9y-M%E1%BB%A5n-Retin-A-Cream-0.025--i.43983841.1319357757"
  },
  {
    "id": "mederma-gel",
    "name": "Mederma Advanced Scar Gel",
    "forSkinType": ["sensitive"],
    "composition": ["Silicone gel sheeting"],
    "description": "Gel giúp giảm sẹo lồi (keloid), làm mềm và mờ sẹo.",
    "img": "https://res.cloudinary.com/dlod5bte9/image/upload/v1747996082/product/osglpgulpsyarrnsfqlx.png",
    "link": "https://www.hangngoainhap.com.vn/4074-kem-lam-mo-seo-mederma-advanced-scar-gel-20g-cua-my.html"
  },
  {
    "id": "skinmedica-retinol",
    "name": "SkinMedica Retinol Complex 0.5",
    "forSkinType": ["dry", "sensitive"],
    "composition": ["Retinoid"],
    "description": "Retinol giúp tái tạo da, mờ sẹo và cải thiện kết cấu da.",
    "img": "https://res.cloudinary.com/dlod5bte9/image/upload/v1747996082/product/k1tem3gbjzhy0lgt8cqt.jpg",
    "link": "https://www.skinmedica.com/us/product-category/correction/94921.html?srsltid=AfmBOoprtmKOCxRoLbh7tL5TD0KWLpUlwdBLkr4lE9pH7_iF5Fjt21hc"
  },
  {
    "id": "cera-ve-niacinamide",
    "name": "CeraVe Facial Moisturizing Lotion PM",
    "forSkinType": ["dry", "sensitive"],
    "composition": ["Niacinamide", "Ceramides"],
    "description": "Dưỡng ẩm và làm dịu da, giúp giảm thâm sẹo và tăng cường hàng rào bảo vệ da.",
    "img": "​​https://res.cloudinary.com/dlod5bte9/image/upload/v1747996081/product/bhtj2awywsf2qnn97rdb.avif",
    "link": "https://www.watsons.vn/vi/s%E1%BB%AFa-d%C6%B0%E1%BB%A1ng-%E1%BA%A9m-ban-%C4%90%C3%AAm-cerave-facial-moist-lotion-pm-52ml/p/BP_212628"
  },
  {
    "id": "skinceuticals-ce-ferulic",
    "name": "SkinCeuticals C E Ferulic",
    "forSkinType": ["dry", "sensitive"],
    "composition": ["Vitamin C", "Vitamin E", "Ferulic Acid"],
    "description": "Tinh chất chống oxy hóa mạnh giúp làm sáng da, giảm thâm sẹo hiệu quả.",
    "img": "https://res.cloudinary.com/dlod5bte9/image/upload/v1747996080/product/zygkfbk8st5yliglqsro.jpg",
    "link": "https://www.skinceuticals.com/c-e-ferulic-635494263008.html"
  },
  {
    "id": "paulas-choice-resist-25-retinol",
    "name": "Paula’s Choice Resist 2.5% Retinol Serum",
    "forSkinType": ["dry"],
    "composition": ["Retinoid"],
    "description": "Serum retinol nhẹ nhàng giúp làm sạch nhân mụn và làm sáng da.",
    "img": "https://res.cloudinary.com/dlod5bte9/image/upload/v1747996082/product/iv7nskrnddgobzcbjhkj.avif",
    "link": "https://www.paulaschoice.com/resist-25-percent-retinol-serum/773.html"
  },
  {
    "id": "scaraway-silicone-gel",
    "name": "ScarAway Silicone Scar Gel",
    "forSkinType": ["sensitive"],
    "composition": ["Silicone gel sheeting"],
    "description": "Gel silicon giúp giảm sẹo lồi, làm mềm sẹo và cải thiện kết cấu da.",
    "img": "https://res.cloudinary.com/dlod5bte9/image/upload/v1747996082/product/ln1dlemuq7ujudbofpcy.png",
    "link": "https://www.scaraway.com/products/scaraway-silicone-scar-gel"
  },
  {
    "id": "bioderma-sebium-gel-moussant",
    "name": "Bioderma Sebium Gel Moussant",
    "forSkinType": ["sensitive"],
    "composition": ["Benzoyl Peroxide"],
    "description": "Gel rửa mặt làm sạch da nhờn, ngừa viêm mụn hiệu quả.",
    "img": "https://res.cloudinary.com/dlod5bte9/image/upload/v1747996083/product/ek86puctdxd5nrwcih1f.jpg",
    "link": "https://www.bioderma.com.vn/san-pham/sebium/gel-moussant"
  }
];


