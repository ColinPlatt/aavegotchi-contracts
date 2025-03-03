import { request } from "graphql-request";
import { UserGotchisOwned } from "../../types";

export const maticGraphUrl: string =
  "https://api.thegraph.com/subgraphs/name/aavegotchi/aavegotchi-core-matic";
export const ethGraphUrl: string =
  "https://api.thegraph.com/subgraphs/name/aavegotchi/aavegotchi-ethereum";

export async function getSubgraphGotchis(
  addresses: string[],
  network: "matic" | "eth"
): Promise<UserGotchisOwned[]> {
  const batches = Math.ceil(addresses.length / 1000);

  let queryData = `{`;

  for (let index = 0; index < batches; index++) {
    const batchId = index;
    const offset = batchId * 1000;
    queryData = queryData.concat(`
    batch${batchId}: users(where:{id_in:[${addresses
      .slice(offset, offset + 1000)
      .map((add: string) => '"' + add.toLowerCase() + '"')}]},first:1000) {
      id
      gotchisOwned(first:1000) {
        id
        status
      }}
`);
  }

  queryData = queryData.concat(`}`);

  const res = await request(
    network === "matic" ? maticGraphUrl : ethGraphUrl,
    queryData
  );

  let finalResponse: UserGotchisOwned[] = [];
  for (let index = 0; index < batches; index++) {
    const batch: UserGotchisOwned[] = res[`batch${index}`];
    finalResponse = finalResponse.concat(batch);
  }

  return finalResponse;
}

export async function getEthSubgraphGotchis(
  addresses: string[],
  network: "matic" | "eth"
): Promise<UserGotchisOwned[]> {
  const batches = Math.ceil(addresses.length / 1000);

  let queryData = `{`;

  for (let index = 0; index < batches; index++) {
    const batchId = index;
    const offset = batchId * 1000;
    queryData = queryData.concat(`
    batch${batchId}: users(where:{id_in:[${addresses
      .slice(offset, offset + 1000)
      .map((add: string) => '"' + add.toLowerCase() + '"')}]},first:1000) {
      id
      gotchisOwned(first:1000) {
        id
      }}
`);
  }

  queryData = queryData.concat(`}`);

  const res = await request(
    network === "matic" ? maticGraphUrl : ethGraphUrl,
    queryData
  );

  let finalResponse: UserGotchisOwned[] = [];
  for (let index = 0; index < batches; index++) {
    const batch: UserGotchisOwned[] = res[`batch${index}`];
    finalResponse = finalResponse.concat(batch);
  }

  return finalResponse;
}

export async function queryAavegotchis(ids: string[]) {
  ids = ids.map((id) => `"${id}"`);

  const query = `
  {aavegotchis(where:{id_in:[${ids}]}) {
    id
    status
  }}
  `;

  const res = await request(maticGraphUrl, query);

  return res;
}
