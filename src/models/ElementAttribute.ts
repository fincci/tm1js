class ElementAttribute {
  public name: string
  private _type: AttributeTypeString

  constructor (name: string, type: AttributeTypeString) {
    this.name = name
    this._type = type
  }

  get type () {
    return AttributeType[this._type.toString()]
  }

  set type (value: AttributeTypeString) {
    this._type = value
  }

  static fromJson (data: ElementAttributeResponse): ElementAttribute {
    return new ElementAttribute(data.Name, data.Type)
  }

  constructBody () {
    const body = {}
    body['Name'] = this.name
    body['Type'] = this.type
    return body
  }

  get body () {
    return this.constructBody()
  }
}

enum AttributeType {
  Numeric,
  String,
  Alias,
}

type AttributeTypeString = keyof typeof AttributeType

interface ElementAttributeResponse {
  Name: string
  Type: AttributeTypeString
}

interface ElementAttributesResponse {
  value: ElementAttributeResponse[]
}

export {
  ElementAttribute,
  ElementAttributeResponse,
  ElementAttributesResponse,
  AttributeType,
  AttributeTypeString
}
