export const fetchValidatorInfo = async (validatorAuth: string) => {
  try {
    if (!validatorAuth) return undefined
    const url = `https://raw.githubusercontent.com/unicornultrafoundation/explorer-assets/master/validators_info/${validatorAuth.toLowerCase()}/info.json`
    const response = await fetch(url)
    const data = await response.json()
    return data
  } catch (error) {
    return undefined
  }
}


