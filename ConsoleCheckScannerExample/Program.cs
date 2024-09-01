using System;
using System.Collections.Generic;
using System.Linq;
using System.Drawing;
using System.IO;
using System.Text;
using System.Threading.Tasks;
using System.Net.Http;
using System.Text.Json;
using CwCheckReader.Entities.Abstract;
using CwCheckReader.Helpers;
using CwCheckReader;
using static System.Net.Mime.MediaTypeNames;
using System.Deployment.Application;

namespace ConsoleCheckScannerExample
{
    internal class Program
    {
        static async Task Main(string[] args)
        {
       
            ICheckReader checkReader = new CwCheckReaderTellerScan();
            var serialNum = ScanLiteProcess.GetSerialNumber();
            var readedCheck = checkReader.ReadTheChecks("1", "C:\\Check", serialNum);
            var success = true;


            if (ApplicationDeployment.IsNetworkDeployed)
            {
                var activationArgs = ApplicationDeployment.CurrentDeployment.ActivationUri;

                if (activationArgs != null)
                {
                    var queryString = activationArgs.Query;
                    Console.WriteLine("Query String: " + queryString);

                    // Parametreleri ayrıştırma
                    var parameters = System.Web.HttpUtility.ParseQueryString(queryString);
                    var param1 = parameters["param1"];

                    // Parametreleri kullanın
                    Console.WriteLine("Param1: " + param1);

                    using (HttpClient client = new HttpClient())
                    {
                       

                        for (int i = 0; i < readedCheck.readedCheckInfo.Count; i++)
                        {

                            try
                            {
                                var BankNo = readedCheck.readedCheckInfo[i].BankNo;
                                var CheckNo = readedCheck.readedCheckInfo[i].CheckNo;
                                var FrontImage = readedCheck.readedCheckInfo[i].FrontImage;
                                var BackImage = readedCheck.readedCheckInfo[i].BackImage;
                                var AccountNo = readedCheck.readedCheckInfo[i].HesNo;

                                Check check = new Check
                                {
                                    bank_number = BankNo,
                                    check_number = CheckNo,
                                    front_image = FrontImage,
                                    back_image = BackImage,
                                    account_number = AccountNo
                                };

                                string jsonString = JsonSerializer.Serialize(check);
                                
                                string url = "http://127.0.0.1:8000/checks/";

                                var content = new StringContent(jsonString, Encoding.UTF8, "application/json");

                                HttpResponseMessage response = await client.PostAsync(url, content);

                                if (response.IsSuccessStatusCode)
                                {
                                    string responseBody = await response.Content.ReadAsStringAsync();
                                }
                                else
                                {
                                    Console.WriteLine($"Error: {response.StatusCode}");
                                    success = false;
                                }
                            }
                            catch (Exception e)
                            {
                                Console.WriteLine($"Exception: {e.Message}");
                            }

                        }

                        ScanStatus scanStatus = new ScanStatus();

                        if (success)
                        {
                            scanStatus.scan_status = 200;
                            scanStatus.scan_status_message = "OK";
                        }
                        else
                        {
                            scanStatus.scan_status = 400;
                            scanStatus.scan_status_message = "ERROR";
                        }


                        string statusJsonString = JsonSerializer.Serialize(scanStatus);
                       
                        string statusUpdateUrl = $"http://127.0.0.1:8000/scan_status/{param1}/";

                        var statusContent = new StringContent(statusJsonString, Encoding.UTF8, "application/json");

                        HttpResponseMessage statusResponse = await client.PutAsync(statusUpdateUrl, statusContent);

                    }

                }
            }

      


;        }

        public class Check
        {
            public string bank_number { get; set; }
            public string check_number { get; set; }
            public string account_number { get; set; }
            public byte[] front_image { get; set; }
            public byte[] back_image { get; set; }
        }

        public class ScanStatus
        {
      
            public int scan_status { get; set; }
            public string scan_status_message { get; set; }
         
        }
    }
}


