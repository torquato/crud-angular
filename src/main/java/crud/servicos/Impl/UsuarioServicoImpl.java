package crud.servicos.Impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;

import crud.modelo.Usuario;
import crud.repositorio.UsuarioRepo;
import crud.servicos.UsuarioServico;

@Service
public class UsuarioServicoImpl implements UsuarioServico {

	@Autowired
	private UsuarioRepo usuarioRepository;

	@Override
	public void salvarUsuario(Usuario usuario) {
		usuarioRepository.save(usuario);
	}

	@Override
	public void deletarUsuario(Long id) {
		usuarioRepository.delete(id);
	}

	@Override
	public List<Usuario> listar() {
		return (List<Usuario>) usuarioRepository.findAll();
	}

	@Override
	public Usuario recuperar(Long id) {
		return usuarioRepository.findOne(id);
	}

	@Override
	public List<Usuario> recuperar(int page, int size) {
		Page<Usuario> pageResponse = usuarioRepository.findAll(new PageRequest(page, size));
		return pageResponse.getContent();
	}

	@Override
	public List<Usuario> recuperar(int page, int size, Direction direction, String... field) {
		Page<Usuario> pageResponse = usuarioRepository.findAll(new PageRequest(page, size, direction, field));
		return pageResponse.getContent();
	}

}
