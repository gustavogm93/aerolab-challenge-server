import { pick } from 'lodash'
import * as Joi from 'joi'

const CONFIG_KEYS = [
  'AEROLAB_MICROSERVICE_URL',
]
const uriRequired = Joi.string().uri().required()

const schema = Joi.object().keys({
  AEROLAB_CHALLENGE_PUBLIC: uriRequired,
})

const items = pick(process.env, CONFIG_KEYS)
const config = Joi.validate(items, schema)
if (config.error) {
  throw config.error
}
export default {
  aerolabMicroserviceUrl: config.value.AEROLAB_MICROSERVICE_URL,
}
