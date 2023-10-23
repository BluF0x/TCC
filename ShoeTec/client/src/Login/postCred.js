import api from "../services/api";

async function cadastrarUsuario(cred) {
  delete cred.confirmPassword

  try {
    const query = await api.post("/users", cred)
    console.log(query)
    return query;
  } catch (err) {
    return err
  }

}

async function logarUsuario(cred) {
  console.log("Logando")
}

async function updateUsuario(cred) {
  try {
    const query = await api.post(`/editUser`,  cred, {withCredentials: true});
    return query;
  } catch (err) {
    return err;
  }
}

async function createTenis(cred) {
  try {
    const query = await api.post(`/createTenis`, cred);
    return query;
  } catch (err) {
    return err;
  }
}

async function updateAdminStatus(cred) {
  try {
    const query = await api.post(`/updateAdminStatus`, cred);
    return query;
  } catch (err) {
    return err;
  }
}

async function deleteUserId(cred) {
  try {
    const query = await api.post(`/deleteUserId`, cred);
    return query;
  } catch (err) {
    return err;
  }
}

export default { cadastrarUsuario, updateUsuario, logarUsuario, createTenis, updateAdminStatus, deleteUserId}