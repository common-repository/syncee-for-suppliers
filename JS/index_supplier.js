jQuery(document).ready(function () {


    function getCurrentURL() {
        return window.location.href
    }

    if (getCurrentURL().includes('wp-admin') && getCurrentURL().includes('syncee')) {


        let restUrl = syncee_globals_supplier.rest_url;
        let siteUrl = syncee_globals_supplier.site_url;
        let syncee_access_token_supplier = syncee_globals_supplier.syncee_access_token_supplier;
        let syncee_user_token_supplier = syncee_globals_supplier.syncee_user_token_supplier;
        let dataToSynceeInstaller = syncee_globals_supplier.data_to_syncee_installer_supplier;
        let syncee_img_dir_url = syncee_globals_supplier.img_dir_url;
        let installerCallbackUrl = syncee_globals_supplier.syncee_installer_url + '/woocommerce_supplier_auth/callback?';//supplier
        let synceeRedirect = syncee_globals_supplier.syncee_url + '/crosslogin?token=';
        let synceeV7Redirect = syncee_globals_supplier.syncee_installer_url + '/woocommerce_supplier_auth/login-with-token?token=';
        let synceeSupplierNonce = syncee_globals_supplier.syncee_supplier_nonce;

        let container = jQuery('.containerSupplier');
        let registerToWoocommerce = jQuery('#registerToWoocommerceSupplier');
        let registerToSyncee = jQuery('#registerToSynceeSupplier');
        let openSyncee = jQuery('#openSynceeSupplier');

        let passed = false;

        function setSynceeLogoSrc() {
            jQuery("#syncee-logo-supplier").attr("src", syncee_img_dir_url + 'syncee-logo-600x.png');

        }

        function connectedToSyncee() {
            return syncee_access_token_supplier;
        }


        jQuery("#registerToWoocommerceButtonSupplier").click(function () {
            window.open(siteUrl + '/wc-auth/v1/authorize?app_name=Syncee&scope=read_write&user_id=1&return_url=' + siteUrl + '/wp-admin/admin.php?page=syncee-for-suppliers&callback_url=' + encodeURIComponent(siteUrl + '/wp-json/syncee/supplier/v1/callbackFromWoocommerce'))
        });


        jQuery("#registerToSynceeButtonSupplier").click(function () {
            window.open(installerCallbackUrl + jQuery.param(dataToSynceeInstaller));
        });


        jQuery("#openSynceeButtonSupplier").click(function () {
            if (connectedToSyncee) {
                if (syncee_user_token_supplier) {
                    window.open(synceeV7Redirect + syncee_user_token_supplier)
                }
                window.open(synceeRedirect + syncee_access_token_supplier)
            } else {
                swal("Failed!", "Something went wrong!", "warning");
            }
        });

        jQuery("#refreshButtonSupplier").click(function () {
            hideAllField();
            getRequirements();
        });

        jQuery("#uninstallEcomButtonSupplier").click(function () {
            uninstallEcom();
        });


        function getRequirements() {
            getDataForFrontend();

            jQuery.ajax({
                url: restUrl + 'getRequirements',
                type: "get",
                dataType: 'json',
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('X-WP-Nonce', synceeSupplierNonce);
                },
                success: function (result) {
                    checkRequirements(result.data)
                    console.log(result.data)
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    console.log(thrownError);
                    // swal({
                    //     title: "Something went wrong!",
                    //     text: "https://help.syncee.co/en/articles/5074038-how-to-install-syncee-to-your-wordpress-store-woocommerce-integration",
                    //     icon: "warning",
                    //     buttons: false,
                    //     dangerMode: true,
                    // });
                }
            });
        }


        function getDataForFrontend() {
            jQuery.ajax({
                url: restUrl + 'getDataForFrontend',
                type: "get",
                dataType: 'json',
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('X-WP-Nonce', synceeSupplierNonce);
                },
                success: function (result) {
                    console.log(result.data)
                    dataToSynceeInstaller = result.data.data_to_syncee_installer_supplier;
                    restUrl = result.data.rest_url;
                    siteUrl = result.data.site_url;
                    syncee_access_token_supplier = result.data.syncee_access_token_supplier;
                    syncee_user_token_supplier = result.data.syncee_user_token_supplier;

                    checkInstalledSyncee();

                }
            });
        }

        function uninstallEcom() {

            swal({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to reach your Syncee account!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then((willDelete) => {
                    if (willDelete) {
                        swal("Your Syncee connection has been deleted!");
                        sendUninstallRequest();
                    }
                });


        }

        function sendUninstallRequest() {
            jQuery.ajax({
                url: restUrl + 'uninstallEcom',
                type: "post",
                dataType: 'json',
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('X-WP-Nonce', synceeSupplierNonce);
                },
                success: function (result) {
                    console.log(result.data);
                    swal("Success!", "Your Syncee account has been deleted!", "success");
                    getRequirements();
                },
                error: function (e) {
                    swal("Failed!", "Something went wrong! Maybe your account has already been deleted.", "warning");
                    console.log(e);
                    getRequirements();
                }
            });
        }

        function checkRequirements(requirements) {
            let checkedRequirements = 0;
            let requirementsLength = 0;
            jQuery.each(requirements, function (key, value) {
                if (value.pass)
                    checkedRequirements++;
                requirementsLength++;

            });

            passed = checkedRequirements === requirementsLength;
            console.log(passed);

            if (!passed) {
                generateTable(requirements);
                hideAllField();
            } else {
                hideRequirementsTable();
            }

            showContainer();
        }

        function hideRequirementsTable() {
            jQuery('#requirementsTable').css("display", "none");
        }

        function checkInstalledSyncee() {
            console.log('HIDE')
            hideAllField();

            if (passed)
                if (syncee_access_token_supplier) {
                    showOpenSyncee();
                } else if (dataToSynceeInstaller) {
                    showRegisterToSyncee();
                } else {
                    showRegisterToWoocommerce();
                }

        }

        function hideAllField() {
            hideOpenSyncee();
            hideRegisterToSyncee();
            hideRegisterToWoocommerce();
        }


        function hideOpenSyncee() {
            openSyncee.css("display", "none");
        }

        function showOpenSyncee() {
            openSyncee.css("display", "inline");
        }

        function hideRegisterToSyncee() {
            registerToSyncee.css("display", "none");
        }

        function showRegisterToSyncee() {
            registerToSyncee.css("display", "inline");
        }

        function hideRegisterToWoocommerce() {
            registerToWoocommerce.css("display", "none");
        }

        function showRegisterToWoocommerce() {
            registerToWoocommerce.css("display", "inline");
        }

        function hideContainer() {
            container.css("display", "none");
        }

        function showContainer() {
            container.css("display", "inline");
        }


        function generateTable(requirementsData) {
            //Build an array containing Customer records.
            var statusTable = [];
            statusTable.push(["Component", "Status", "How to fix"]);


            jQuery.each(requirementsData, function (key, value) {

                statusTable.push([value.title, value.pass ? '<span style="color: green">Passed.</span>' : '<span style="color:red;">Failed!</span>', value.pass ? '/' : value.solution])

            });

            //Create a HTML Table element.
            var table = jQuery("<table class='table' />");
            table[0].border = "1";

            //Get the count of columns.
            var columnCount = statusTable[0].length;

            //Add the header row.
            var row = jQuery(table[0].insertRow(-1));
            for (var i = 0; i < columnCount; i++) {
                var headerCell = jQuery("<th />");
                headerCell.html(statusTable[0][i]);
                row.append(headerCell);
            }

            //Add the data rows.
            for (var i = 1; i < statusTable.length; i++) {
                row = jQuery(table[0].insertRow(-1));
                for (var j = 0; j < columnCount; j++) {
                    var cell = jQuery("<td />");
                    cell.html(statusTable[i][j]);
                    row.append(cell);
                }
            }

            var requirementsTable = jQuery("#requirementsTable");
            requirementsTable.html("");
            requirementsTable.append(table);
        }

        setSynceeLogoSrc()

        hideContainer();

        getRequirements();

        hideAllField();

        getDataForFrontend();
    }

});
