package crud.servicos;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;

import crud.modelo.Usuario;

public interface UsuarioServico {

	public void salvarUsuario(Usuario usuario);

	public void deletarUsuario(Long id);

	public List<Usuario> listar();
	
	public Usuario recuperar(Long id);
	
	public List<Usuario> recuperar(int page, int size);

	public List<Usuario> recuperar(int page,int size, Direction direction, String ... field);
}
