package com.project.helpDesk.api.enums;

public enum StatusEnum {

	Novo,
	Atribuido,
	Resolvido,
	Aprovado,
	Reprovado,
	Fechado;
	
	public static StatusEnum getStatus(String status) {
		switch (status) {
			case "Novo": return Novo;
			case "Atribuido": return Atribuido;
			case "Resolvido": return Resolvido;
			case "Aprovado": return Aprovado;
			case "Reprovado": return Reprovado;
			case "Fechado": return Fechado;
			default: return Novo;
		}
	}
	
}
