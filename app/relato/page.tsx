"use client";
import { useState } from "react";

export default function Relato() {
  const [step, setStep] = useState<number>(1);
  const [identificacao, setIdentificacao] = useState<string>("");
  const [nome, setNome] = useState<string>("");
  const [cpf, setCpf] = useState<string>("");
  const [hospital, setHospital] = useState<string>("");
  const [tipoOcorrencia, setTipoOcorrencia] = useState<string[]>([]);
  const [descricao, setDescricao] = useState<string>("");
  const [enviado, setEnviado] = useState<boolean>(false);

  function nextStep() {
    setStep((prev) => prev + 1);
  }

  function prevStep() {
    setStep((prev) => prev - 1);
  }

  function toggleTipo(valor: string) {
    setTipoOcorrencia((prev) =>
      prev.includes(valor)
        ? prev.filter((item) => item !== valor)
        : [...prev, valor]
    );
  }

  async function handleSubmit() {
    try {
      const response = await fetch("https://formspree.io/f/xqeddqwk", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          identificacao,
          nome: identificacao === "sim" ? nome : "Anônimo",
          cpf: identificacao === "sim" ? cpf : "Não informado",
          hospital,
          tipoOcorrencia: tipoOcorrencia.join(", "),
          descricao,
        }),
      });

      if (response.ok) {
        setEnviado(true);
      } else {
        alert("Erro ao enviar. Tente novamente.");
      }
    } catch (error) {
      alert("Erro de conexão.");
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 p-6 text-gray-900">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-xl w-full border border-gray-200">
        <h1 className="text-3xl font-bold text-blue-700 mb-8 text-center">
          Canal de Ética
        </h1>

        {enviado ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-green-700 mb-4">
              Agradecemos sua confiança.
            </h2>
            <p className="text-gray-800 leading-relaxed">
              Este canal é um instrumento de cuidado coletivo. Cada manifestação contribui para um ambiente mais seguro e respeitoso para todos.
            </p>
          </div>
        ) : (
          <>
            {step === 1 && (
              <div>
                <h2 className="text-lg font-semibold mb-4">Etapa 1 – Identificação</h2>

                <div className="flex flex-col gap-3">
                  <label>
                    <input
                      type="radio"
                      value="sim"
                      checked={identificacao === "sim"}
                      onChange={(e) => setIdentificacao(e.target.value)}
                    />{" "}
                    Quero me identificar
                  </label>

                  <label>
                    <input
                      type="radio"
                      value="nao"
                      checked={identificacao === "nao"}
                      onChange={(e) => setIdentificacao(e.target.value)}
                    />{" "}
                    Quero permanecer anônimo
                  </label>
                </div>

                {identificacao === "sim" && (
                  <div className="mt-5 flex flex-col gap-3">
                    <input
                      type="text"
                      placeholder="Digite seu nome"
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                      className="border border-gray-300 rounded-lg p-3"
                    />
                    <input
                      type="text"
                      placeholder="Digite seu CPF"
                      value={cpf}
                      onChange={(e) => setCpf(e.target.value)}
                      className="border border-gray-300 rounded-lg p-3"
                    />
                  </div>
                )}

                <button
                  onClick={nextStep}
                  className="mt-6 bg-blue-700 hover:bg-blue-800 text-white py-2 px-4 rounded-lg"
                >
                  Próxima
                </button>
              </div>
            )}

            {step === 2 && (
              <div>
                <h2 className="text-lg font-semibold mb-4">Etapa 2 – Hospital</h2>

                <select
                  value={hospital}
                  onChange={(e) => setHospital(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-3"
                >
                  <option value="">Selecione o hospital</option>
                  <option>Hospital Promater</option>
                  <option>Unimed</option>
                  <option>Casa de Saúde São Lucas</option>
                  <option>Vita</option>
                </select>

                <div className="flex justify-between mt-6">
                  <button
                    onClick={prevStep}
                    className="bg-gray-400 text-white py-2 px-4 rounded-lg"
                  >
                    Voltar
                  </button>
                  <button
                    onClick={nextStep}
                    className="bg-blue-700 text-white py-2 px-4 rounded-lg"
                  >
                    Próxima
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h2 className="text-lg font-semibold mb-4">Etapa 3 – Tipo de Ocorrência</h2>

                {[
                  "Dificuldade operacional / processo",
                  "Postura profissional inadequada",
                  "Conduta Antiética",
                  "Assédio Moral",
                  "Outras situações",
                ].map((item) => (
                  <label key={item} className="flex items-center gap-2 mb-2">
                    <input
                      type="checkbox"
                      checked={tipoOcorrencia.includes(item)}
                      onChange={() => toggleTipo(item)}
                    />
                    {item}
                  </label>
                ))}

                <div className="flex justify-between mt-6">
                  <button
                    onClick={prevStep}
                    className="bg-gray-400 text-white py-2 px-4 rounded-lg"
                  >
                    Voltar
                  </button>
                  <button
                    onClick={nextStep}
                    className="bg-blue-700 text-white py-2 px-4 rounded-lg"
                  >
                    Próxima
                  </button>
                </div>
              </div>
            )}

            {step === 4 && (
              <div>
                <h2 className="text-lg font-semibold mb-4">Etapa 4 – Descrição</h2>

                <textarea
                  rows={5}
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-3"
                  placeholder="Descreva detalhadamente o ocorrido..."
                />

                <div className="flex justify-between mt-6">
                  <button
                    onClick={prevStep}
                    className="bg-gray-400 text-white py-2 px-4 rounded-lg"
                  >
                    Voltar
                  </button>
                  <button
                    onClick={nextStep}
                    className="bg-blue-700 text-white py-2 px-4 rounded-lg"
                  >
                    Próxima
                  </button>
                </div>
              </div>
            )}

            {step === 5 && (
              <div>
                <h2 className="text-lg font-semibold mb-4">Confirmação</h2>

                <div className="flex justify-between">
                  <button
                    onClick={prevStep}
                    className="bg-gray-400 text-white py-2 px-4 rounded-lg"
                  >
                    Voltar
                  </button>

                  <button
                    onClick={handleSubmit}
                    className="bg-green-700 hover:bg-green-800 text-white py-2 px-4 rounded-lg"
                  >
                    Enviar Relato
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}