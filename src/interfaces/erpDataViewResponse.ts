
export interface ERPDataViewResponse {
  query: string
  originaPrompt: string,
  error?: string
  queryResults?: Record<string,string>[]
  responseToHuman: string

}