package com.project.helpDesk.api.dto;

import java.io.Serializable;

public class Summary implements Serializable {

	private static final long serialVersionUID = 1L;
	
	Integer quantidadeNovo;
	Integer quantidadeResolvido;
	Integer quantidadeAprovado;
	Integer quantidadeReprovado;
	Integer quantidadeAtribuido;
	Integer quantidadeFechado;
	
	/*************************************************************
	 * METODOS ACESSORES
	 ************************************************************/
	
	public Integer getQuantidadeNovo() {
		return quantidadeNovo;
	}
	
	public void setQuantidadeNovo(Integer quantidadeNovo) {
		this.quantidadeNovo = quantidadeNovo;
	}
	
	public Integer getQuantidadeResolvido() {
		return quantidadeResolvido;
	}
	
	public void setQuantidadeResolvido(Integer quantidadeResolvido) {
		this.quantidadeResolvido = quantidadeResolvido;
	}
	
	public Integer getQuantidadeAprovado() {
		return quantidadeAprovado;
	}
	
	public void setQuantidadeAprovado(Integer quantidadeAprovado) {
		this.quantidadeAprovado = quantidadeAprovado;
	}
	
	public Integer getQuantidadeReprovado() {
		return quantidadeReprovado;
	}
	
	public void setQuantidadeReprovado(Integer quantidadeReprovado) {
		this.quantidadeReprovado = quantidadeReprovado;
	}
	
	public Integer getQuantidadeAtribuido() {
		return quantidadeAtribuido;
	}
	
	public void setQuantidadeAtribuido(Integer quantidadeAtribuido) {
		this.quantidadeAtribuido = quantidadeAtribuido;
	}
	
	public Integer getQuantidadeFechado() {
		return quantidadeFechado;
	}
	
	public void setQuantidadeFechado(Integer quantidadeFechado) {
		this.quantidadeFechado = quantidadeFechado;
	}
	
	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	@Override
	public String toString() {
		return "Summary [quantidadeNovo=" + quantidadeNovo + ", quantidadeResolvido=" + quantidadeResolvido
				+ ", quantidadeAprovado=" + quantidadeAprovado + ", quantidadeReprovado=" + quantidadeReprovado
				+ ", quantidadeAtribuido=" + quantidadeAtribuido + ", quantidadeFechado=" + quantidadeFechado + "]";
	}

}
