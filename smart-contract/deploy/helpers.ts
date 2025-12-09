export const logDeploy = (contractName: string, address: string) => {
    console.info(`\x1b[32m${contractName}\x1b[0m:\t`, '\x1b[36m', address, '\x1b[0m');
}

export const delay = (ms: number): any => {
  return new Promise(resolve => setTimeout(resolve, ms));
}