package crud.modelo;

import java.io.Serializable;

public enum GeneroEnum implements Serializable {
	M("Masculino"), F("Feminino");

	public String descricao;

	private GeneroEnum(String descricao) {
		this.descricao = descricao;
	}
}
