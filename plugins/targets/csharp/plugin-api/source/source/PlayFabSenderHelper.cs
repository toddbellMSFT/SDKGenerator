using System.Collections.Generic;
using System.Threading.Tasks;
using PlayFab.Internal;

namespace PlayFab
{
    public static class PlayFabSenderHelper
    {
        private static ITransportPlugin transport;

        static PlayFabSenderHelper()
        {
            transport = (ITransportPlugin)PluginManager.Instance.GetPlugin(PluginContract.Transport);
            if (transport == null)
            {
                transport = new PlayFabHttp();
                PluginManager.Instance.SetPlugin(PluginContract.Transport, transport);
            }
        }

        public static async Task<object> DoPost(string urlPath, PlayFabRequestCommon request, string authType, string authKey, Dictionary<string, string> extraHeaders)
        {
            return await transport.DoPost(urlPath, request, authType, authKey, extraHeaders);
        }
    }
}
