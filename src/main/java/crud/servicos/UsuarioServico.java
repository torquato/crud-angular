package crud.servicos;

import java.util.List;

import crud.modelo.Usuario;

public interface UsuarioServico {

	public void salvarUsuario(Usuario usuario);

	public void deletarUsuario(Long id);

	public List<Usuario> listar();
	
	public Usuario recuperar(Long id);
}
