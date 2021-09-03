async function main() {
  const diamond = "0x86935F11C86623deC8a25696E1C19a8659CbF95d";
  this.timeout = 30000000;
  const Loupe = await ethers.getContractAt("DiamondLoupeFacet", diamond);

  const allFacets = await Loupe.facets();
  console.log(allFacets);
}

main();
/** 
 [
  '0xefD4Cc25E5D01F84411D8Fca321F74bdf65E3d02',
  [ '0xa6655766' ],
  facetAddress: '0xefD4Cc25E5D01F84411D8Fca321F74bdf65E3d02',
  functionSelectors: [ '0xa6655766' ]
]


[
  '0xc317D47d094958b2D7f2e689598d3EC3fD75577F',
  [ '0xefdbb74b' ],
  facetAddress: '0xc317D47d094958b2D7f2e689598d3EC3fD75577F',
  functionSelectors: [ '0xefdbb74b' ]
]



[
  '0x70b03b843122887B907d177C97d0CD837cC5667c',
  [ '0xb7127e41', '0xc6b05266' ],
  facetAddress: '0x70b03b843122887B907d177C97d0CD837cC5667c',
  functionSelectors: [ '0xb7127e41', '0xc6b05266' ]
]



facetAddress: '0x2eC212685CdEba693772dd0716551Eda4eb6965b',
    functionSelectors: [
      '0x6a8926e8', '0x6c71c40b',
      '0xea69aae2', '0xbc197c81',
      '0xf23a6e61', '0x2eb2c2d6',
      '0xf242432a', '0x4d11f02e',
      '0x271a6c59', '0x3936b8d2'
    ]
  ]
  */
