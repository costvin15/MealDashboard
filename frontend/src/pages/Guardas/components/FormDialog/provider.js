import {api, user} from '../../../../helpers'

export const Provider = {
  getGraduations: async () => {
    try {
      const response = []
      const {empresa, token} = user.getInfo()
      const {data: {data}} = await api.get(`/graduacoes/${empresa}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      
      data.map(data => {
        response.push({id: data.id, value: data.descricao})
        return data
      })
      
      return response;
    } catch (error) {
      console.log(error)
    }
  },
  getFunctions: async () => {
    try {
      const response = []
      const {empresa, token} = user.getInfo()
      const {data: {data}} = await api.get(`/funcoes/${empresa}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      
      data.map(data => {
        response.push({id: data.id, value: data.nome})
        return data
      })

      return response
    } catch (error) {
      console.log(error)
    }
  },
  performRegister: async ({
    nome,
    nome_guerra,
    email,
    senha,
    sexo,
    graduacao_id,
    funcao_id,
    admissao,
  }) => {
    const {empresa, token} = user.getInfo()
    await api.post(`/usuarios/${empresa}`, {
      nome,
      nome_guerra,
      email,
      senha,
      sexo: sexo === 0 ? 'M' : 'F',
      graduacao_id,
      funcao_id,
      admissao,
      empresa_id: empresa,
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  },
  performEdit: async ({
    id,
    nome,
    nome_guerra,
    email,
    senha,
    sexo,
    graduacao_id,
    funcao_id,
    admissao,
    demissao = null,
  }) => {
    const {empresa, token} = user.getInfo()
    await api.put(`/usuarios/${id}/${empresa}`, {
      nome,
      nome_guerra,
      email,
      senha,
      sexo: sexo === 0 ? 'M' : 'F',
      graduacao_id,
      funcao_id,
      admissao,
      demissao,
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  },
}

export default Provider
