import { Maybe } from ".graphclient"

export function subscriptionName(name: Maybe<string> | undefined) {
  return name?.substring(0, name.indexOf(".eth")).toLowerCase()
}
